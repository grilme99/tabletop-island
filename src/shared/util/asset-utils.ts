import Make from "@rbxts/make";
import { ContentProvider } from "@rbxts/services";

// eslint-disable-next-line import/prefer-default-export
export async function PreloadImageId(imageId: string) {
    const image = Make("ImageLabel", { Image: imageId });
    ContentProvider.PreloadAsync([image]);
    image.Destroy();
}
