module.exports = {
   parser: '@typescript-eslint/parser',
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:next/recommended', // Thêm dòng này
      
   ],
   plugins: ['next'],
   rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "error", // Thêm dòng này nếu muốn bắt lỗi
      "@typescript-eslint/no-wrapper-object-types": "error", // Thêm dòng này nếu muốn bắt lỗi
   },
};
