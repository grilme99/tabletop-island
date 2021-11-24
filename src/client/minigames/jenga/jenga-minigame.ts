import { Minigame, OnMinigameEnd, OnMinigameStart } from "client/controllers/minigame/minigame-decorator";
import { MinigameId } from "types/enum/minigame";

@Minigame({
    minigameId: MinigameId.Jenga,
})
export class JengaMinigame implements OnMinigameStart, OnMinigameEnd {
    public onStart() {}

    public onEnd() {}
}
