require('esbuild').buildSync({
    entryPoints: ["./src/index.jsx"],
    bundle: true,
    minify: false,
    sourcemap: false,
     loader: { '.woff2': 'file' },
    outfile: "./../priv/static/assets/output.js",
}
)