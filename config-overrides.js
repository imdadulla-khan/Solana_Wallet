const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
    crypto: require.resolve("crypto-browserify"),
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  return config;
};
