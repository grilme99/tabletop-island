// Bootstraps the Flamework runtime on the client
import { Flamework } from "@flamework/core";

Flamework.addPaths("src/client/controllers", "src/client/components", "src/client/apps", "src/client/interactions");
Flamework.ignite();
