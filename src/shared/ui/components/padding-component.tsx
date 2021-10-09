import Roact from "@rbxts/roact";

type IProps = Roact.PropsWithChildren<{
    Padding: number;
}>;

const PaddingComponent = Roact.forwardRef<IProps, UIPadding>((props, ref) => {
    return (
        <uipadding
            PaddingBottom={new UDim(0, props.Padding)}
            PaddingLeft={new UDim(0, props.Padding)}
            PaddingRight={new UDim(0, props.Padding)}
            PaddingTop={new UDim(0, props.Padding)}
            Ref={ref}
        >
            {props[Roact.Children]}
        </uipadding>
    );
});

export default PaddingComponent;
