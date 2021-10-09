import { Controller, OnInit } from "@flamework/core";
import inspect from "@rbxts/inspect";
import Log from "@rbxts/log";
import Make from "@rbxts/make";
import { SoundService, TweenService } from "@rbxts/services";
import SoundSystem from "client/modules/lib/3d-sound-system";

export const enum SoundType {
    Music = "Music",
    SoundEffect = "SoundEffect",
}

@Controller({})
export default class SoundController implements OnInit {
    private soundGroups = new Map<SoundType, SoundGroup>();

    /** @hidden */
    public onInit(): void {
        this.soundGroups.set(SoundType.Music, this.makeSoundGroup(SoundType.Music));
        this.soundGroups.set(SoundType.SoundEffect, this.makeSoundGroup(SoundType.SoundEffect));

        Log.Info("Setup SoundGroup instances");
    }

    private makeSoundGroup(soundType: SoundType): SoundGroup {
        // Make sure this SoundGroup doesn't already exist
        const existing = SoundService.FindFirstChild(soundType);
        if (existing && existing.IsA("SoundGroup")) return existing;

        return Make("SoundGroup", {
            Name: soundType,
            Volume: 1,
            Parent: SoundService,
        });
    }

    public playSound(options: {
        sound: number;
        soundType: SoundType;

        // Optional
        debugName?: string;
        fadeInTime?: number;
        soundProperties?: Omit<Partial<InstanceProperties<Sound>>, "Parent">;
        attachToPoint?: BasePart;
    }): Sound {
        const { sound, soundType, debugName, soundProperties = {}, attachToPoint, fadeInTime } = options;

        const soundGroup = this.soundGroups.get(soundType);
        if (!soundGroup) throw `SoundType ${soundType} is not registered`;

        const soundParent = attachToPoint || soundGroup;
        const soundObj = Make("Sound", {
            ...soundProperties,
            Name: debugName || inspect(sound),
            SoundId: `rbxassetid://${sound}`,
            SoundGroup: soundGroup,
            Parent: soundParent,
        });

        // Make it a 3D spatial sound if a point was declared
        if (attachToPoint) {
            SoundSystem.Attach(soundObj);
        }

        soundObj.Play();
        if (fadeInTime) {
            const desiredVolume = soundObj.Volume;
            soundObj.Volume = 0;

            const tweenInfo = new TweenInfo(fadeInTime, Enum.EasingStyle.Quad, Enum.EasingDirection.Out);
            TweenService.Create(soundObj, tweenInfo, { Volume: desiredVolume }).Play();
        }

        Log.Info(`Playing sound "{Sound}" of type "{SoundType}"`, sound, soundType);

        return soundObj;
    }
}
