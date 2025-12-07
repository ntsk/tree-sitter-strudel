/**
 * @file Strudel grammar for tree-sitter
 * @author ntsk <ntsk@ntsk.jp>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "strudel",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
