module.exports = {
    entry: "./src/alpha.js",
    resolve: {
        fallback: {
            path: false,
            fs: false,
            child_process: false,
            crypto: false,
            url: false,
            module: false,
        },
    },
    output: {
        filename: "./alpha.js",
        // library: "alpha",
    },
    mode: "production",
};
