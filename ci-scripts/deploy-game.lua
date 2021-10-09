local STAGING_PLACES = {};

local PRODUCTION_PLACES = {};

-- The built game file should be created by the Actions pipeline beforehand
print("Reading source game file")
local startTime = os.clock();
local game = remodel.readPlaceFile("./game.rbxlx");
print(string.format("Finished reading source game file in %s seconds\n", os.clock() - startTime));

-- Loop through all places and publish the game to them
local args = {...};
local desiredPlaces = args[1] == "production"
    and PRODUCTION_PLACES or args[1] == "staging"
    and STAGING_PLACES
    or error(("Invalid arg 1, expected 'production' or 'staging', got '%s'"):format(args[1]));

local startTimeAll = os.clock();
local placeCount = 0;
for placeId, placeName in pairs(desiredPlaces) do
    placeCount = placeCount + 1;
    print(string.format('Starting to publish to place "%s" (%s)', placeName, placeId))

    local startTimePlace = os.clock();
    remodel.writeExistingPlaceAsset(game, placeId);

    local diffTime = (os.clock() - startTimePlace);
    print(string.format('Published to place "%s" (%s) in %s seconds\n', placeName, placeId, diffTime));
end

local diffTime = (os.clock() - startTimeAll);
print(string.format("\nDONE!\nPublished to %s places in %s seconds", placeCount, diffTime));
