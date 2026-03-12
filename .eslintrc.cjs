module.exports = {
  extends: ["next/core-web-vitals", "next/typescript"],
  ignorePatterns: ["node_modules", ".next", "out"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off"
  }
};
