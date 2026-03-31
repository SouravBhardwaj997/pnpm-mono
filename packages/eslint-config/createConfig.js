import antfu from "@antfu/eslint-config";

function createConfig(options, ...userConfigs) {
  return antfu(
    {
      type: "app",
      typescript: true,
      formatters: true,
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
      ...options,
    },
    {
      rules: {
        "ts/consistent-type-definitions": ["error", "interface"],
        "no-console": ["warn"],
        "antfu/no-top-level-await": ["off"],
        "node/prefer-global/process": ["error"],
        "node/no-process-env": ["error"],
        "perfectionist/sort-imports": "error",
        "unicorn/filename-case": [
          "error",
          {
            case: "camelCase",
            ignore: ["README.md"],
          },
        ],
      },
    },
    ...userConfigs,
  );
}

export default createConfig;
