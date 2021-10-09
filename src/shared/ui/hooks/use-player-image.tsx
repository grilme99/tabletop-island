import { CoreHooks } from "@rbxts/roact-hooks";
import { Players } from "@rbxts/services";
import { PreloadImageId as preloadImageId } from "shared/util/asset-utils";

const usePlayerImage = (
    userId: number,
    thumbnailType: Enum.ThumbnailType,
    thumbnailSize: Enum.ThumbnailSize,
    { useState, useEffect }: CoreHooks,
) => {
    const [playerImage, setPlayerImage] = useState("");

    useEffect(() => {
        task.defer(() => {
            const [thumbnail] = Players.GetUserThumbnailAsync(userId, thumbnailType, thumbnailSize);
            preloadImageId(thumbnail).await();
            setPlayerImage(thumbnail);
        });
    }, [userId, thumbnailType, thumbnailSize]);

    return playerImage;
};

export default usePlayerImage;
