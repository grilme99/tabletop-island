interface Lighting {
	Atmosphere: Atmosphere;
	ColorCorrection: ColorCorrectionEffect;
	Sky: Sky;
	SunRays: SunRaysEffect;
}

interface ReplicatedStorage {
	Assets: Folder;
	TS: Folder & {
		events: ModuleScript;
		functions: ModuleScript;
		meta: Folder & {
			"default-player-data": ModuleScript;
			"minigame-meta": ModuleScript;
		};
		modules: Folder & {
			draw: ModuleScript;
		};
		"shared-constants": ModuleScript;
		"tabletop-island.storybook": ModuleScript;
		ui: Folder & {
			components: Folder & {
				"padding-component": ModuleScript;
				viewport: Folder & {
					"object-viewport": ModuleScript;
					"object-viewport.story": ModuleScript;
				};
			};
			hooks: Folder & {
				"use-mount-effect": ModuleScript;
				"use-player-image": ModuleScript;
			};
			theme: ModuleScript;
		};
		util: Folder & {
			"asset-utils": ModuleScript;
			"color-utils": ModuleScript;
			"core-call": ModuleScript;
			"flamework-utils": ModuleScript;
			"physics-utils": ModuleScript;
			"random-utils": ModuleScript;
			"story-utils": ModuleScript;
			"tag-utils": ModuleScript;
		};
	};
	rbxts_include: Folder & {
		Promise: ModuleScript;
		RuntimeLib: ModuleScript;
	};
}

interface ServerScriptService {
	TS: Folder & {
		components: Folder & {
			"interactable-component": ModuleScript;
		};
		events: ModuleScript;
		modules: Folder & {
			classes: Folder & {
				"player-entity": ModuleScript;
			};
			"with-player-entity": ModuleScript;
		};
		runtime: Script;
		services: Folder & {
			"character-service": ModuleScript;
			player: Folder & {
				"player-data-service": ModuleScript;
				"player-removal-service": ModuleScript;
				"player-service": ModuleScript;
			};
		};
	};
}

interface Workspace {
	Terrain: Terrain & {
		Clouds: Clouds;
		Rocks: Folder & {
			Rock10: MeshPart;
			Rock05: MeshPart;
			Rock08: MeshPart;
			Rock02: MeshPart;
			Rock07: MeshPart;
			Rock09: MeshPart;
			Rock04: MeshPart;
			Rock06: MeshPart;
			Rock03: MeshPart;
			RockBoulder21: MeshPart;
			RockBoulder13: MeshPart;
			Rock01: MeshPart;
		};
		Playzone: Part;
		Spawn: Part;
	};
	TestInteraction: Part;
}
