const path = require("path");

module.exports = {
    input: "./src/index.js",
    output: {
        moduleName: "Package",
        minify: true,
        format: ["umd", "esm"],
        dir: "./build"
    }
};