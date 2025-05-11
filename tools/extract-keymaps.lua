-- Function to extract keymap configurations from Neovim and convert them to a list of keymap items
function extractKeymaps()
    -- Get all keymaps for normal mode
    local keymaps = vim.api.nvim_get_keymap('n')
    local result = {}

    for _, keymap in ipairs(keymaps) do
        -- Replace spaces with <leader> in lhs
        local lhs = keymap.lhs
        -- Split lhs into individual characters
        local keystrokes = {}
        for i = 1, #lhs do
            table.insert(keystrokes, lhs:sub(i, i))
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

-- Convert the extracted keymaps to JSON and print it
local keymaps = extractKeymaps()
local json = vim.fn.json_encode(keymaps)
print(json)
