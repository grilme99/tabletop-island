import Make from "@rbxts/make";
import Roact, { JsxInstanceProperties } from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import { useMountEffect } from "shared/ui/hooks/use-mount-effect";

interface IProps {
    nativeProps: JsxInstanceProperties<ViewportFrame>;
    instance: BasePart | Model;
    extraCameraDepth?: number;
}

function setDefaultCameraView(camera: Camera, model: Model, cameraDepth = 0) {
    const [modelCF] = model.GetBoundingBox();

    // We can't make use of this because it's RobloxScriptSecurity
    // camera.SetImageServerView(modelCF)

    const radius = model.GetExtentsSize().Magnitude / 2;
    const halfFov = math.rad(camera.FieldOfView) / 2;
    const depth = radius / math.tan(halfFov) + cameraDepth; // Some arbitrary value to push it further back.

    // 1. Remove translation
    // 2. Move to model position
    // 3. Push camera back by depth in the original angle given by SetImageServerView
    // SetImageServerView ensures that camera.CFrame.p and modelCF.p will always be different values
    camera.CFrame = camera.CFrame.sub(camera.CFrame.Position)
        .add(modelCF.Position)
        .add(camera.CFrame.Position.sub(modelCF.Position).Unit.mul(depth));
}

const InnerObjectViewport: Hooks.FC<IProps> = (props, hooks) => {
    // Setup the viewport after mounting when we have a ref to it
    const viewportRef = Roact.createRef<ViewportFrame>();
    useMountEffect(() => {
        const viewport = viewportRef.getValue()!;

        let model = props.instance;
        if (!model.IsA("Model")) {
            model = Make("Model", {
                PrimaryPart: props.instance as BasePart,
                Children: [props.instance],
            });
        }
        model.Parent = viewport;

        const viewportCamera = new Instance("Camera");
        viewport.CurrentCamera = viewportCamera;
        setDefaultCameraView(viewportCamera, model, props.extraCameraDepth);
        viewportCamera.Parent = viewport;
    }, hooks);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <viewportframe {...props.nativeProps} Ref={viewportRef}>
            {props[Roact.Children]}
        </viewportframe>
    );
};

export const ObjectViewport = new Hooks(Roact)(InnerObjectViewport, {
    componentType: "PureComponent",
    defaultProps: {},
});
