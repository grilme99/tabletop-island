/* eslint-disable max-classes-per-file */

import { Controller, Flamework, OnInit, Reflect } from "@flamework/core";
import Log from "@rbxts/log";
import Roact from "@rbxts/roact";
import RoactRodux, { StoreProvider } from "@rbxts/roact-rodux";
import Rodux from "@rbxts/rodux";
import { CollectionService, Players } from "@rbxts/services";
import { ClientStore, IClientStore, StoreActions } from "client/rodux/rodux";
import { Scene } from "types/enum/scene";
import { DecoratorMetadata } from "types/interfaces/flamework";
import SceneController from "./scene-controller";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassDecorator = (ctor: any) => any;
type Constructor<T = Roact.Component> = new (...args: never[]) => T;

const noop = () => {};

export type StoreDispatch = Rodux.Dispatch<StoreActions>;

export interface IAppConfig {
    /** Debug name for app. */
    name: string;
    /** Only show this app if we are in one of these scenes. */
    requiredScenes?: Scene[];
    /** Show this app on any part with this CollectionService tag. */
    tag?: string;
    /** Display order of Surface/ScreenGui. */
    displayOrder?: number;
    /** Ignore topbar inset if rendering with a ScreenGui. */
    ignoreGuiInset?: boolean;
    /** If this is specified then the root component will be connected to Rodux. */
    mapStateToProps?: (state: IClientStore) => unknown;
    mapDispatchToProps?: (dispatch: StoreDispatch) => unknown;
}

interface AppInfo {
    ctor: Constructor;
    identifier: string;
    config: IAppConfig;
}

export declare function App(opts: IAppConfig): ClassDecorator;

/** Handles the loading of classes decorated with App */
@Controller({})
export default class AppController implements OnInit {
    private apps = new Map<Constructor, AppInfo>();
    private appHandles = new Map<Constructor, Roact.Tree>();

    private tagConnections = new Set<string>();

    private playerGui = Players.LocalPlayer.FindFirstChildOfClass("PlayerGui")!;

    constructor(private readonly sceneController: SceneController) {}

    /** @hidden */
    public onInit(): void {
        this.sceneController.OnSceneChanged.Connect((n, o) => this.onSceneChanged(n, o));

        for (const [ctor, identifier] of Reflect.objToId) {
            const app = Reflect.getOwnMetadata<DecoratorMetadata<IAppConfig>>(
                ctor,
                `flamework:decorators.${Flamework.id<typeof App>()}`,
            );

            if (app) {
                const config = app.arguments[0];

                this.apps.set(ctor as Constructor, {
                    ctor: ctor as Constructor,
                    config,
                    identifier,
                });

                if (config.tag) {
                    // This is connected to a CollectionService tag, setup connections
                    this.setupTagConnections(config.tag);
                }
            }
        }
    }

    /** Setup CollectionService connections for a specific tag. */
    private setupTagConnections(tag: string) {
        if (this.tagConnections.has(tag)) return;

        CollectionService.GetTagged(tag).forEach((i) => this.onTagAdded(tag, i));
        CollectionService.GetInstanceAddedSignal(tag).Connect((i) => this.onTagAdded(tag, i));
        // CollectionService.GetInstanceRemovedSignal(tag).Connect((i) => this.onTagRemoved(tag, i));

        Log.Debug(`Added connections for tag "{Tag}"`, tag);
        this.tagConnections.add(tag);
    }

    /** When an instance is added to a tag, we want to find out which apps render onto it. */
    private onTagAdded(tag: string, instance: Instance) {
        if (!instance.IsA("BasePart")) return;
        Log.Debug(`Instance "{Instance}" added to tag "{Tag}"`, instance.GetFullName(), tag);

        for (const [app, { config }] of this.apps) {
            if (config.tag !== tag) continue;
            this.showApp(app, instance);
            return;
        }
    }

    /** Unmount any apps which are connected to a dead instance. */
    // private onTagRemoved(tag: string, instance: Instance) {
    //     Log.Debug(`Instance "${instance.GetFullName()}" removed from tag "${tag}"`);
    // }

    private onSceneChanged(newScene: Scene, oldScene?: Scene) {
        for (const [element, { config }] of this.apps) {
            if (config.requiredScenes === undefined) continue;

            const usedToBeOpen = oldScene ? config.requiredScenes.includes(oldScene) : false;
            const openNow = config.requiredScenes.includes(newScene);

            if (!usedToBeOpen && openNow) {
                // This app should be shown again
                Log.Debug(`SHOWING app "{Name}"`, config.name);
                this.showApp(element);
            } else if (usedToBeOpen && !openNow) {
                // This app should be hidden
                Log.Debug(`HIDING app "{Name}"`, config.name);
                this.hideApp(element);
            }
        }
    }

    private showApp(element: Constructor, instance?: BasePart) {
        const { config } = this.apps.get(element)!;

        let component = element as unknown as Roact.FunctionComponent;
        if (config.mapStateToProps || config.mapDispatchToProps) {
            const mapStateToProps = config.mapStateToProps || noop;
            const mapDispatchToProps = config.mapDispatchToProps || noop;

            component = RoactRodux.connect(
                (state: IClientStore) => mapStateToProps(state),
                (dispatch: StoreDispatch) => mapDispatchToProps(dispatch),
            )(component);
        }

        const content = <StoreProvider store={ClientStore}>{Roact.createElement(component)}</StoreProvider>;

        const handle = Roact.mount(
            instance ? (
                <surfacegui
                    Key={config.name}
                    Adornee={instance}
                    LightInfluence={1}
                    ResetOnSpawn={false}
                    ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
                    SizingMode={Enum.SurfaceGuiSizingMode.PixelsPerStud}
                    PixelsPerStud={50}
                >
                    {content}
                </surfacegui>
            ) : (
                <screengui
                    Key={config.name}
                    DisplayOrder={config.displayOrder}
                    IgnoreGuiInset={config.ignoreGuiInset}
                    ResetOnSpawn={false}
                    ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
                >
                    {content}
                </screengui>
            ),
            this.playerGui,
            config.name,
        );

        this.appHandles.set(element, handle);
        Log.Debug(`Mounted new app instance "{Name}"`, config.name);
    }

    private hideApp(element: Constructor) {
        const handle = this.appHandles.get(element);
        if (!handle) return Log.Warn(`No Handle for element {@Element}`, element);
        Roact.unmount(handle);
    }
}
