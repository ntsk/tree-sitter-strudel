(comment) @comment

"const" @keyword

(string) @string
(pattern_string) @string

(number) @number

(call_expression
  (identifier) @function)

(call_expression
  (member_expression
    property: (identifier) @function))

(member_expression
  property: (identifier) @function)

(variable_declaration
  (identifier) @variable)

(arrow_function
  (identifier) @variable)

(arrow_function
  (parameters
    (identifier) @variable.parameter))

((identifier) @variable.builtin
  (#match? @variable.builtin "^(sine|saw|tri|square|cosine|rand|perlin|sine2|saw2|tri2|square2|cosine2|rand2|mouseX|mouseY|irand|brandBy)$"))

(label_statement
  "$:" @keyword)

(rest) @keyword

(repeat) @operator
(slow) @operator
(weight) @operator
(replicate) @operator
(degrade) @operator

["=>" "?"] @operator

["[" "]" "<" ">" "(" ")"] @punctuation.bracket

["," "|" "." "="] @punctuation.delimiter

[
  "+"
  "-"
  "*"
  "/"
  "%"
  "=="
  "==="
  "!="
  "!=="
  "<"
  "<="
  ">"
  ">="
  "&&"
  "||"
] @operator
