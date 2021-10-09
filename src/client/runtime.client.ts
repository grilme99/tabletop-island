// Bootstraps the Flamework runtime on the client
import { Flamework } from "@flamework/core";
import Log, { Logger } from "@rbxts/log";

// eslint-disable-next-line prettier/prettier
Log.SetLogger(
    Logger.configure()
        .EnrichWithProperty("Version", PKG_VERSION)
        .WriteTo(Log.RobloxOutput())
        .Create()
)

Flamework.addPaths("src/client/controllers", "src/client/components", "src/client/apps", "src/client/interactions");
Flamework.ignite();
