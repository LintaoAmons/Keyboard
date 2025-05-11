-- Function to extract keymap configurations from Neovim and convert them to a list of keymap items
function extractKeymaps()
    -- Get all keymaps for normal mode
    local keymaps = vim.api.nvim_get_keymap('n')
    local result = {}

    for _, keymap in ipairs(keymaps) do
        -- Replace spaces with <leader> in lhs
        local lhs = keymap.lhs:gsub(" ", "<leader>")
        -- Use rhs or desc for description, fallback to "anonymous function" if neither is available
        local description = keymap.desc or keymap.rhs or "anonymous function"
        -- Format the keymap item string
        local keymapItem = lhs .. "|" .. description
        table.insert(result, keymapItem)
    end

    return result
end

-- Print the extracted keymaps for debugging or usage
local keymaps = extractKeymaps()
for _, item in ipairs(keymaps) do
    print(item)
end
