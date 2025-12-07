package tree_sitter_strudel_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_strudel "github.com/ntsk/tree-sitter-strudel/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_strudel.Language())
	if language == nil {
		t.Errorf("Error loading Strudel grammar")
	}
}
