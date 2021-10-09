// Bootstraps the Flamework runtime on the server
import { Flamework } from "@flamework/core";

Flamework.addPaths("src/server/services", "src/server/components");
Flamework.ignite();
