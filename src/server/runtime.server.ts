// Bootstraps the Flamework runtime on the server
import { Flamework } from "@flamework/core";
import Log, { Logger, LogLevel } from "@rbxts/log";
import { RunService } from "@rbxts/services";

Log.SetLogger(
    Logger.configure()
        .SetMinLogLevel(RunService.IsStudio() ? LogLevel.Verbose : LogLevel.Information)
        .EnrichWithProperty("Version", PKG_VERSION)
        .WriteTo(Log.RobloxOutput())
        .Create(),
);

Flamework.addPaths("src/server/services", "src/server/components");
Flamework.ignite();
