(comment) @comment

(string) @string
(pattern_string) @string

(number) @number

(call_expression
  (identifier) @function)

(call_expression
  (member_expression
    (identifier) @function .))

(member_expression
  . (identifier) @variable
  (identifier) @function)

(member_expression
  (call_expression)
  (identifier) @function)

((identifier) @variable.builtin
  (#match? @variable.builtin "^(sine|saw|tri|square|cosine|rand|perlin|sine2|saw2|tri2|square2|cosine2|rand2|mouseX|mouseY|irand|brandBy)$"))

(rest) @keyword

(repeat) @operator
(slow) @operator
(weight) @operator
(replicate) @operator
(degrade) @operator

["[" "]" "<" ">" "(" ")"] @punctuation.bracket

["," "|" "."] @punctuation.delimiter
