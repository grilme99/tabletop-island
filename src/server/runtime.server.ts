// Bootstraps the Flamework runtime on the server
import { Flamework } from "@flamework/core";
import Log, { Logger } from "@rbxts/log";

// eslint-disable-next-line prettier/prettier
Log.SetLogger(
    Logger.configure()
        .EnrichWithProperty("Version", PKG_VERSION)
        .WriteTo(Log.RobloxOutput())
        .Create()
)

Flamework.addPaths("src/server/services", "src/server/components");
Flamework.ignite();
