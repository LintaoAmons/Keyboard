-- A Neovim Lua script to parse a Lua keymap table and generate a JSON config file for Lintaos Keyboard

local M = {}

-- 1. get keymap configs lua table by using vim.api.nvim_get_keymap('n')
-- 2. generate keymapItems out of the table elements.
  -- lhs ->     keybinding: KeyStroke[],replace " " to "<leader>"
  -- rhs || desc || "anamous function" -> description?: string
  -- e.g.
  {
    abbr = 0,
    buffer = 0,
    desc = "Jump to LSP symbol",
    expr = 0,
    lhs = " ss",
    lhsraw = " ss",
    lnum = 0,
    mode = "n",
    mode_bits = 1,
    noremap = 1,
    nowait = 0,
    rhs = ":Namu symbols<CR>",
    script = 0,
    scriptversion = 1,
    sid = 3,
    silent = 1
  } 
  -->
  "<leader>,s,s|:Namu symbols<CR>"

-- write the function with no input, and the output is a list of those mapped elements



return M
