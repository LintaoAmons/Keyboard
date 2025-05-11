-- :source %
-- to generate the 
-- Function to extract keymap configurations from Neovim and convert them to a list of keymap items
function extractKeymaps()
	-- Get all keymaps for normal mode
	local keymaps = vim.api.nvim_get_keymap("n")
	local result = {}

	for _, keymap in ipairs(keymaps) do
		-- Replace spaces with <leader> in lhs
		local lhs = keymap.lhs
		-- Split lhs into individual keystrokes, considering <xx> as single keys and <Plug> as a whole key
		local keystrokes = {}
		if lhs:sub(1, 6) == "<Plug>" then
			-- Skip processing for <Plug> keymaps
			goto continue
		else
			local i = 1
			while i <= #lhs do
				if lhs:sub(i, i) == "<" then
					local endIndex = lhs:find(">", i)
					if endIndex then
						local key = lhs:sub(i, endIndex)
						-- Convert the last character before '>' to lowercase if it's uppercase
						local lastCharIndex = endIndex - 1
						local lastChar = key:sub(lastCharIndex, lastCharIndex)
						if lastChar:match("%u") then
							key = key:sub(1, lastCharIndex - 1) .. lastChar:lower() .. key:sub(lastCharIndex + 1)
						end
						table.insert(keystrokes, key)
						i = endIndex + 1
					else
						table.insert(keystrokes, lhs:sub(i, i))
						i = i + 1
					end
				else
					table.insert(keystrokes, lhs:sub(i, i))
					i = i + 1
				end
			end
		end
		local formattedLhs = table.concat(keystrokes, ","):gsub(" ", "<leader>")
		-- Use rhs or desc for description, fallback to "anonymous function" if neither is available
		local description = keymap.desc or keymap.rhs or "anonymous function, please add desc to your keybinding settings"
		-- Format the keymap item string
		local keymapItem = formattedLhs .. "|" .. description
		table.insert(result, keymapItem)
		::continue::
	end

	return result
end

-- Template Lua table representing the structure of default.json
local configTemplate = {
    name = "Generated",
    version = "0.1",
    keyboardLayout = {
        name = "Lintao's keyboard",
        layout = {
            {
                "esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "⬅️,grow"
            },
            {
                "tab,3", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "|,grow"
            },
            {
                "ctrl,4", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter,grow"
            },
            {
                "shift,5", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift,grow"
            },
            {
                "", "", "alt", "cmd", "space,14", "hyper", "alt"
            }
        }
    },
    scenarios = {
        {
            name = "Vim Generated",
            keymapItems = {}  -- This will be populated with the extracted keymaps
        }
    }
}

-- Convert the extracted keymaps to JSON and write to a file
local keymaps = extractKeymaps()
-- Assign the extracted keymaps to the template
configTemplate.scenarios[1].keymapItems = keymaps

-- Convert the entire config to JSON
local json = vim.fn.json_encode(configTemplate)
local file = io.open("src/configs/generated.json", "w")
if file then
    file:write(json)
    file:close()
    print("Configuration has been written to src/configs/generated.json")
else
    print("Error: Could not open file for writing")
end
