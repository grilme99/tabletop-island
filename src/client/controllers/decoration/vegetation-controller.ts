import { Controller, OnStart, OnInit, OnRender } from "@flamework/core";
import Log from "@rbxts/log";
import Octree from "@rbxts/octree";
import { ReplicatedStorage, RunService, Workspace } from "@rbxts/services";
import { ColorUtil } from "shared/util/color-utils";
import VEGETATION_POINTS from "./vegetation-points";

const FALLBACK_WIND_DIRECTION = new Vector3(10, 0, 5);
const VEGETATION_INSTANCES = [ReplicatedStorage.Assets.Decorations.TallGrass];
const BRIGHTEST_COLOR = Color3.fromRGB(104, 143, 92);
const DARKEST_COLOR = Color3.fromRGB(89, 122, 79);

const raycastParams = new RaycastParams();
raycastParams.FilterDescendantsInstances = [Workspace.Terrain];
raycastParams.FilterType = Enum.RaycastFilterType.Whitelist;
raycastParams.IgnoreWater = true;

const camera = Workspace.CurrentCamera!;

interface IVegetationPoint {
    template: MeshPart;
    origin: CFrame;
    seed: number;

    currentInstance?: MeshPart;
    lastCompute?: number;
}

/** Handles rendering custom terrain vegetation in a performant manner. */
@Controller({})
export default class VegetationController implements OnStart, OnInit, OnRender {
    private vegetationOctree = new Octree<IVegetationPoint>();
    private rng = new Random();

    /** @hidden */
    public onInit(): void {}

    /** @hidden */
    public onStart(): void {
        this.handleVegetationPoints();
    }

    /** Slowly inserts all of the vegetation points into the octree. */
    private async handleVegetationPoints() {
        const pointCount = VEGETATION_POINTS.size();
        Log.Debug("Adding {Count} vegetation points", pointCount);

        const interval = 10;
        for (let i = 0; i < pointCount + interval; i += interval) {
            for (let n = 0; n < interval; n++) {
                const point = VEGETATION_POINTS[i + n];
                if (!point) continue;

                this.vegetationOctree.CreateNode(point.Position, {
                    template: this.pickVegetationObj(),
                    origin: point,
                    seed: this.rng.NextNumber(0, 100),
                });
            }

            RunService.Heartbeat.Wait();
        }

        Log.Debug("Finished adding vegetation points");
    }

    private pickVegetationObj() {
        const index = this.rng.NextInteger(0, VEGETATION_INSTANCES.size() - 1);
        const obj = VEGETATION_INSTANCES[index];
        return obj;
    }

    /**
     * Right now (29/01/22) Workspace.GlobalWind is behind an fflag. Use
     * this to fallback to a default value if it isn't available.
     */
    private getWindDirection() {
        type WorkspaceWind = Workspace & { GlobalWind: Vector3 };
        return (Workspace as WorkspaceWind).GlobalWind ?? FALLBACK_WIND_DIRECTION;
    }

    /** @hidden */
    public onRender(): void {
        const now = os.clock();

        debug.profilebegin("Vegetation");

        const cameraCf = camera.CFrame;

        debug.profilebegin("Octree");
        const nearbyPoints = this.vegetationOctree.RadiusSearch(
            cameraCf.Position.add(cameraCf.LookVector.mul(115)),
            120,
        );
        debug.profileend();

        const windDirection = this.getWindDirection();
        const windSpeed = windDirection.Magnitude;

        const objects = new Array<BasePart>(nearbyPoints.size());
        const targets = new Array<CFrame>(nearbyPoints.size());

        debug.profilebegin("Calc");
        for (const [i, point] of ipairs(nearbyPoints)) {
            // If this point doesn't have an object yet, create one
            if (point.currentInstance === undefined) {
                const obj = point.template.Clone();

                // Add some random variation to each object
                const sizeMultiplier = this.rng.NextNumber(0.65, 1);
                obj.Size = obj.Size.mul(sizeMultiplier);

                const colorAlpha = this.rng.NextNumber();
                const color = ColorUtil.lerp(DARKEST_COLOR, BRIGHTEST_COLOR, colorAlpha);
                obj.Color = color;

                const height = obj.Size.Y / 2;
                const rotation = CFrame.Angles(0, this.rng.NextNumber(-math.pi, math.pi), 0);
                obj.CFrame = point.origin.add(new Vector3(0, height, 0)).mul(rotation);
                obj.Parent = Workspace.Terrain;

                point.currentInstance = obj;
            }

            // Sway logic
            const { seed } = point;
            const amp = 0.5 * 0.1;

            const freq = now * (windSpeed * 0.08) + 0.8;
            const rotX = math.noise(freq, seed, seed) * amp;
            const rotY = math.noise(freq, seed, -seed) * amp;
            const rotZ = math.noise(freq, seed, seed + seed) * amp;

            const offset = point.currentInstance.PivotOffset;
            const worldPivot = point.origin;

            const target = worldPivot
                .mul(CFrame.Angles(rotX, rotY, rotZ))
                .add(windDirection.mul(0.01 * math.noise(freq, seed, seed) * amp))
                .mul(offset.Inverse());

            objects[i - 1] = point.currentInstance;
            targets[i - 1] = target;

            point.lastCompute = now;
        }
        debug.profileend();

        Workspace.BulkMoveTo(objects, targets, Enum.BulkMoveMode.FireCFrameChanged);
        debug.profileend();
    }
}
