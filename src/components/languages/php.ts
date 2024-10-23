export const PHP = async () => {
  const monaco = await import("monaco-editor");

  monaco.languages.register({ id: "php" });

  monaco.languages.setMonarchTokensProvider("php", {
    tokenizer: {
      root: [[/<\?php/, { token: "comment", next: "@php" }]],
      php: [
        [/<\?php/, { token: "comment" }],
        [/\?>/, { token: "comment", next: "@pop" }],
        [
          /[a-z_$][\w$]*/,
          { cases: { "@keywords": "keyword", "@default": "identifier" } },
        ],
        [/[{}()\[\]]/, "@brackets"],
        [/[ \t\r\n]+/, "white"],
        [/[;,.]/, "delimiter"],
      ],
    },
    keywords: [
      "echo",
      "print",
      "die",
      "exit",
      "if",
      "else",
      "while",
      "for",
      "foreach",
      "function",
      "return",
    ],
  });

  monaco.languages.setLanguageConfiguration("php", {
    comments: {
      lineComment: "//",
      blockComment: ["/*", "*/"],
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
    ],
  });
};
