# tree-sitter-strudel

[![CI](https://github.com/ntsk/tree-sitter-strudel/actions/workflows/ci.yml/badge.svg)](https://github.com/ntsk/tree-sitter-strudel/actions/workflows/ci.yml)

Strudel grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter).

## Usage

### Neovim

For usage with [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter), add this to your configuration:

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.strudel = {
  install_info = {
    url = "https://github.com/ntsk/tree-sitter-strudel",
    files = {"src/parser.c"},
    branch = "main",
  },
  filetype = "strudel",
}
```

```vim
autocmd BufNewFile,BufRead *.str,*.std set filetype=strudel
autocmd FileType strudel TSBufEnable highlight
```

Then run `:TSInstall strudel`

> **Note:** You may need to manually place `queries/highlights.scm` from this repository into `~/.config/nvim/queries/strudel/highlights.scm`.

## References

- [Strudel](https://strudel.cc/)
- [Strudel Documentation](https://strudel.cc/learn/code/)
