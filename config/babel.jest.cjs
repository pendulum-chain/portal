const babelJestMd = require('babel-jest');
const babelJest = babelJestMd.__esModule ? babelJestMd.default : babelJestMd;

module.exports = babelJest.createTransformer({
  presets: [
    [
      '@babel/preset-typescript',
      {
        jsxPragma: 'h',
      },
    ],
    '@babel/preset-env',
  ],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h',
        pragmaFrag: 'Fragment',
      },
    ],
    '@babel/plugin-proposal-class-properties',
  ],
  babelrc: false,
  configFile: false,
});
