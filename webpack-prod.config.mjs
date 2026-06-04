import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Webpack production build — triggers the same missing-export check as Rsbuild/Rspack prod. */
export default {
  mode: "production",
  entry: { main: "./src/index" },
  output: {
    path: path.resolve(__dirname, "webpack-prod-dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: { fullySpecified: false },
      },
    ],
  },
};
