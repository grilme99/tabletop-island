import { SingleMotor, Spring } from "@rbxts/flipper";
import { useFlipper } from "@rbxts/hook-bag";
import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import Theme from "shared/ui/theme";
import { IHotbarItemInStore } from "types/interfaces/hotbar-types";

interface IProps {
    meta: IHotbarItemInStore;
    index: number;
    selected: boolean;
    onSelected: Callback;
}

const inputAreaScale = 1.4;

const InnerHotbarItem: Hooks.FC<IProps> = ({ meta, selected, index, onSelected }, hooks) => {
    const { useEffect, useValue } = hooks;

    const transitionMotor = useValue(new SingleMotor(selected ? 1 : 0)).value;
    const [transitionRatio] = useFlipper(transitionMotor)(hooks);

    // Update the motor every time "selected" updates
    useEffect(() => {
        transitionMotor.setGoal(
            new Spring(selected ? 1 : 0, {
                frequency: 5,
                dampingRatio: 0.625,
            }),
        );
    }, [selected, transitionMotor]);

    return (
        <frame Key={meta.id} Size={UDim2.fromScale(0, 1)} BackgroundTransparency={1}>
            <uiaspectratioconstraint
                DominantAxis={Enum.DominantAxis.Height}
                AspectType={Enum.AspectType.ScaleWithParentSize}
            />

            {/* Inner frame that we can freely move around without influence from the UIListLayout */}
            <frame
                Position={transitionRatio.map((ratio) => UDim2.fromOffset(0, 0).Lerp(UDim2.fromOffset(0, -10), ratio))}
                Size={UDim2.fromScale(1, 1)}
                BorderSizePixel={0}
                BackgroundColor3={Theme.white}
                BorderColor3={new Color3(1, 1, 1)}
            >
                <uicorner CornerRadius={new UDim(1, 0)} />

                {/* Input area that goes past the visual UI */}
                <imagebutton
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Position={UDim2.fromScale(0.5, 0.5)}
                    Size={UDim2.fromScale(inputAreaScale, inputAreaScale)}
                    BackgroundTransparency={1}
                    ZIndex={2}
                    Event={{
                        Activated: () => onSelected(),
                    }}
                />

                {/* Selected ring */}
                <uistroke
                    Color={transitionRatio.map((ratio) => Theme.gray300.Lerp(Theme.primaryColor, ratio))}
                    Thickness={3}
                />

                {/* Item number */}
                <textlabel
                    Position={transitionRatio.map((ratio) =>
                        UDim2.fromOffset(-2, -5).Lerp(UDim2.fromOffset(-2, -8), ratio),
                    )}
                    Size={UDim2.fromOffset(20, 20)}
                    BackgroundColor3={Theme.primaryColor}
                    BorderSizePixel={0}
                    Text={tostring(index + 1)}
                    TextColor3={Theme.white}
                    Font={Theme.fontPrimary}
                    TextSize={12}
                >
                    <uicorner CornerRadius={new UDim(1, 0)} />
                </textlabel>
            </frame>
        </frame>
    );
};

export const HotbarItem = new Hooks(Roact)(InnerHotbarItem, {
    componentType: "PureComponent",
    defaultProps: {},
});
