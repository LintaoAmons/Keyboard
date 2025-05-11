-- Function to extract keymap configurations from Neovim and convert them to a list of keymap items
function extractKeymaps()
    -- Get all keymaps for normal mode
    local keymaps = vim.api.nvim_get_keymap('n')
    local result = {}

    for _, keymap in ipairs(keymaps) do
        -- Replace spaces with <leader> in lhs
        local lhs = keymap.lhs
        -- Split lhs into individual keystrokes, considering <xx> as single keys and <Plug> as a whole key
        local keystrokes = {}
        if lhs:sub(1, 6) == "<Plug>" then
            table.insert(keystrokes, lhs)
        else
            local i = 1
            while i <= #lhs do
                if lhs:sub(i, i) == "<" then
                    local endIndex = lhs:find(">", i)
                    if endIndex then
                        local key = lhs:sub(i, endIndex)
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
        local description = keymap.desc or keymap.rhs or "anonymous function"
        -- Format the keymap item string
        local keymapItem = formattedLhs .. "|" .. description
        table.insert(result, keymapItem)
    end

    return result
end

-- Convert the extracted keymaps to JSON and write to a file
local keymaps = extractKeymaps()
local json = vim.fn.json_encode(keymaps)
local file = io.open("keymaps.json", "w")
if file then
    file:write(json)
    file:close()
    print("Keymaps have been written to keymaps.json")
else
    print("Error: Could not open file for writing")
end
