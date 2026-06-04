import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Rspack production build — same ESModulesLinkingError as webpack-prod.config.mjs. */
export default {
  mode: "production",
  entry: { main: "./src/index" },
  output: {
    path: path.resolve(__dirname, "rspack-prod-dist"),
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
