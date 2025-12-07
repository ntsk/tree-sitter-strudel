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

  conflicts: $ => [
    [$.primary_expression, $.arrow_function],
    [$.member_expression, $.primary_expression],
    [$.primary_expression, $.parameters],
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.variable_declaration,
      $.label_statement,
      $.expression_statement,
    ),

    variable_declaration: $ => seq(
      'const',
      field('name', $.identifier),
      '=',
      field('value', $._expression),
      optional(';')
    ),

    label_statement: $ => seq(
      '$:',
      $._expression,
      optional(';')
    ),

    expression_statement: $ => seq($._expression, optional(';')),

    _expression: $ => choice(
      $.ternary_expression,
      $.binary_expression,
      $.call_expression,
      $.member_expression,
      $.arrow_function,
      $.array,
      $.primary_expression,
    ),

    primary_expression: $ => choice(
      $.parenthesized_expression,
      $.pattern_string,
      $.string,
      $.number,
      $.identifier,
    ),

    parenthesized_expression: $ => seq(
      '(',
      $._expression,
      ')'
    ),

    ternary_expression: $ => prec.right(1, seq(
      $._expression,
      '?',
      $._expression,
      ':',
      $._expression
    )),

    binary_expression: $ => choice(
      prec.left(2, seq($._expression, '||', $._expression)),
      prec.left(3, seq($._expression, '&&', $._expression)),
      prec.left(4, seq($._expression, '==', $._expression)),
      prec.left(4, seq($._expression, '===', $._expression)),
      prec.left(4, seq($._expression, '!=', $._expression)),
      prec.left(4, seq($._expression, '!==', $._expression)),
      prec.left(5, seq($._expression, '<', $._expression)),
      prec.left(5, seq($._expression, '<=', $._expression)),
      prec.left(5, seq($._expression, '>', $._expression)),
      prec.left(5, seq($._expression, '>=', $._expression)),
      prec.left(6, seq($._expression, '+', $._expression)),
      prec.left(6, seq($._expression, '-', $._expression)),
      prec.left(7, seq($._expression, '*', $._expression)),
      prec.left(7, seq($._expression, '/', $._expression)),
      prec.left(7, seq($._expression, '%', $._expression)),
    ),

    call_expression: $ => prec.left(10, seq(
      choice(
        $.member_expression,
        $.call_expression,
        $.identifier,
        $.parenthesized_expression,
      ),
      $.arguments
    )),

    member_expression: $ => prec.left(11, seq(
      choice(
        $.call_expression,
        $.member_expression,
        $.primary_expression,
      ),
      '.',
      $.identifier
    )),

    arrow_function: $ => prec.right(0, seq(
      choice(
        $.identifier,
        $.parameters,
      ),
      '=>',
      $._expression
    )),

    parameters: $ => seq(
      '(',
      optional(seq(
        $.identifier,
        repeat(seq(',', $.identifier))
      )),
      ')'
    ),

    arguments: $ => seq(
      '(',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression))
      )),
      ')'
    ),

    array: $ => seq(
      '[',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression))
      )),
      ']'
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
      '>',
      optional($.modifier)
    ),

    chord: $ => prec.left(2, seq(
      $.element,
      repeat1(seq(',', $.element))
    )),

    choice: $ => prec.left(1, seq(
      $.element,
      repeat1(seq('|', $.element))
    )),

    rest: $ => seq('~', optional($.modifier)),

    element: $ => prec.right(3, seq(
      $._element_value,
      optional($.modifier)
    )),

    _element_value: $ => /[a-zA-Z0-9#:]+/,

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

    number: $ => /\d+(\.\d+)?|\.\d+/,

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    comment: $ => token(seq('//', /.*/)),
  }
});
