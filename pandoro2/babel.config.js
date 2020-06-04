module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
            ".png"
          ],
          alias: {
            '@root': './src',
            '@styles': './src/styles',
            '@pages': './src/pages',
            '@components': './src/components',
            '@assets': './src/assets',
            '@utils': './src/utils',
            '@store': './src/store',
            '@routes': './src/routes',
            '@services': './src/services',
          }
        }
      ]
    ]
  };
};
