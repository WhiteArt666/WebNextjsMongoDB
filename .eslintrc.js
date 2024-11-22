module.exports = {
   parser: '@typescript-eslint/parser',
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'next/core-web-vitals'
   ],
   plugins: ['@typescript-eslint'],
   rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-wrapper-object-types": "error",
   },
};