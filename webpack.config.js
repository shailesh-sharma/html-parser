const path = require("path");
const { LoaderOptionsPlugin, DefinePlugin } = require("webpack");
const babelLoaderOptions = {
  plugins: [
    [
      "transform-react-jsx",
      {
        pragma: "h"
      }
    ]

  ]
};

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = function (env) {
  return {
    mode : "development",
    entry: {
      editor: ["./index.js"]
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "umd"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    // for enabling source maps,un-comment the below line
    devtool: "source-map",
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.tsx?$/,
          loader: `babel-loader?${JSON.stringify(
            babelLoaderOptions
          )}!awesome-typescript-loader?tsconfig=./tsconfig.json`
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer()],
          lessLoader: {
            sourceMap: false
          },
          context: ""
        }
      }),
      new DefinePlugin({
        'process.env.LeonardoScoreCardVersion': JSON.stringify(env.version)
      })
    ]
  };
};
