// Bootstraps the Flamework runtime on the client
import { Flamework } from "@flamework/core";
import Log, { Logger, LogLevel } from "@rbxts/log";
import { RunService } from "@rbxts/services";

Log.SetLogger(
    Logger.configure()
        .SetMinLogLevel(RunService.IsStudio() ? LogLevel.Verbose : LogLevel.Information)
        .EnrichWithProperty("Version", PKG_VERSION)
        .WriteTo(Log.RobloxOutput({ TagFormat: "full" }))
        .Create(),
);

Flamework.addPaths(
    "src/client/controllers",
    "src/client/components",
    "src/client/apps",
    "src/client/interactions",
    "src/client/minigames",
);
Flamework.ignite();
