/**
 * @file Strudel grammar for tree-sitter
 * @author ntsk <ntsk@ntsk.jp>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "strudel",

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.expression,
    ),

    expression: $ => $.call_expression,

    call_expression: $ => prec.left(10, seq(
      choice(
        $.member_expression,
        $.identifier
      ),
      $.arguments
    )),

    member_expression: $ => prec.left(9, seq(
      choice(
        $.call_expression,
        $.identifier
      ),
      '.',
      $.identifier
    )),

    arguments: $ => seq(
      '(',
      optional(seq(
        $._argument,
        repeat(seq(',', $._argument))
      )),
      ')'
    ),

    _argument: $ => choice(
      $.call_expression,
      $.pattern_string,
      $.string,
      $.number,
      $.identifier,
    ),

    pattern_string: $ => seq(
      '"',
      optional($.pattern),
      '"'
    ),

    pattern: $ => repeat1($._pattern_element),

    _pattern_element: $ => choice(
      $.group,
      $.alternation,
      $.chord,
      $.choice,
      $.rest,
      $.element,
    ),

    group: $ => seq(
      '[',
      repeat1($._pattern_element),
      ']',
      optional($.modifier)
    ),

    alternation: $ => seq(
      '<',
      repeat1($._pattern_element),
      '>'
    ),

    chord: $ => prec.left(2, seq(
      $.element,
      repeat1(seq(',', $.element))
    )),

    choice: $ => prec.left(1, seq(
      $.element,
      repeat1(seq('|', $.element))
    )),

    rest: $ => '~',

    element: $ => prec.right(3, seq(
      $._element_value,
      optional($.modifier)
    )),

    _element_value: $ => /[a-zA-Z0-9#]+/,

    modifier: $ => choice(
      $.repeat,
      $.slow,
      $.weight,
      $.replicate,
      $.degrade,
    ),

    repeat: $ => seq('*', /\d+(\.\d+)?/),
    slow: $ => seq('/', /\d+(\.\d+)?/),
    weight: $ => seq('@', /\d+(\.\d+)?/),
    replicate: $ => seq('!', /\d+/),
    degrade: $ => seq('?', optional(/\d+(\.\d+)?/)),

    string: $ => /'[^']*'/,

    number: $ => /\d+(\.\d+)?/,

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    comment: $ => token(seq('//', /.*/)),
  }
});
