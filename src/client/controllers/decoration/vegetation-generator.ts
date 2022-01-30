/* eslint-disable import/first */

/**
 * Statically generates vegetation points on the map. This means that
 * clients don't need to compute all of the points at runtime because
 * the map is entirely static, and it can just be done in studio.
 *
 * This prints the final script output, which can then be copied into
 * `vegetation-points.ts` and tidied up a bit manually.
 */

// Patch for the RuntimeLib erroring
table.clear(_G);

import Make from "@rbxts/make";
import Octree from "@rbxts/octree";
import { Workspace } from "@rbxts/services";

const MAX_HEIGHT = 250;
const RAYCAST_DEPTH = 1000;
const MAP_SIZE = new Vector2(1266, 1170);
const CHUNK_SIZE = 100;
const TILT_RANGE = math.rad(25);

const RAYCAST_PARAMS = new RaycastParams();
RAYCAST_PARAMS.FilterType = Enum.RaycastFilterType.Whitelist;
RAYCAST_PARAMS.FilterDescendantsInstances = [Workspace.Terrain];
RAYCAST_PARAMS.IgnoreWater = true;

function computeChunk(chunkPosition: Vector3, points: Array<CFrame>, pointsOctree: Octree<unknown>) {
    const rng = new Random();
    const halfSize = CHUNK_SIZE / 2;

    // Loop through each point in the chunk and work out if we can place vegetation there
    for (let x = 0; x < CHUNK_SIZE; x += 4) {
        for (let z = 0; z < CHUNK_SIZE; z += 4) {
            // Only want to place it sometimes
            if (rng.NextNumber() < 0.6) continue;

            const noise = new Vector3(rng.NextNumber(-2, 2), 0, rng.NextNumber(-2, 2));
            const offset = new Vector3(x - halfSize, 0, z - halfSize);
            const position = chunkPosition.add(offset).add(noise);

            // Work out the ground position
            const result = Workspace.Raycast(position, new Vector3(0, -RAYCAST_DEPTH, 0), RAYCAST_PARAMS);
            if (!result || result.Material !== Enum.Material.Grass) continue;
            // if (!result) continue;

            const groundPosition = result.Position;

            // Make sure they aren't placed too close to each other
            const nearbyPoints = pointsOctree.RadiusSearch(groundPosition, rng.NextNumber(2, 4));
            if (nearbyPoints.size() > 0) continue;

            const rotation = CFrame.Angles(
                rng.NextNumber(-TILT_RANGE, TILT_RANGE),
                rng.NextNumber(-math.pi, math.pi),
                rng.NextNumber(-TILT_RANGE, TILT_RANGE),
            );
            const finalCf = new CFrame(groundPosition).mul(rotation);

            points.push(finalCf);
            pointsOctree.CreateNode(finalCf.Position, {});

            const part = Make("Part", {
                CFrame: finalCf.mul(new CFrame(0, 2.5, 0)),
                Size: new Vector3(1, 5, 1),
                Anchored: true,
                CastShadow: false,
                CanCollide: false,
                CanQuery: false,
                CanTouch: false,
                Parent: Workspace.Terrain,
            });
            task.delay(20, () => part.Destroy());
        }
    }
}

function generateStringOutput(points: Array<CFrame>) {
    const template = `const VEGETATION_POINTS = [%s];\n\nexport = VEGETATION_POINTS`;
    let pointsStr = "";

    for (const point of points) {
        pointsStr += `    new CFrame(${tostring(point)}),\n`;
    }

    const finalStr = template.format(pointsStr);
    print(finalStr);

    // const ui = Make("ScreenGui", {
    //     Parent: StarterGui,
    //     Archivable: false,

    //     Children: [
    //         Make("TextBox", {
    //             AnchorPoint: new Vector2(0.5, 0.5),
    //             Position: UDim2.fromScale(0.5, 0.5),
    //             Size: UDim2.fromOffset(200, 200),
    //             ClearTextOnFocus: false,
    //             Text: finalStr,
    //         }),
    //     ],
    // });

    // task.delay(10, () => ui.Destroy());
}

function generatePoints() {
    const currentPoints = new Array<CFrame>();
    const pointsOctree = new Octree();

    // Main loop for computation
    // Work through the area in chunks
    for (let x = 0; x < MAP_SIZE.X + CHUNK_SIZE; x += CHUNK_SIZE) {
        for (let z = 0; z < MAP_SIZE.Y + CHUNK_SIZE; z += CHUNK_SIZE) {
            const chunkPosition = new Vector3(x - MAP_SIZE.X / 2, MAX_HEIGHT, z - MAP_SIZE.Y / 2);

            computeChunk(chunkPosition, currentPoints, pointsOctree);
        }
    }

    generateStringOutput(currentPoints);
}

export = generatePoints;
