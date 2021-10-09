local ReplicatedStorage = game:GetService("ReplicatedStorage");
local StarterPlayer = game:GetService("StarterPlayer");
local ServerScriptService = game:GetService("ServerScriptService");
local RunService = game:GetService("RunService");

local node_modules = ReplicatedStorage.rbxts_include.node_modules;
local TestEZ = require(node_modules.testez.src);

if (RunService:IsStudio()) then
    TestEZ.TestBootstrap:run({ StarterPlayer, ServerScriptService, ReplicatedStorage });
end
