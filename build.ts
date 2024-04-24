import { Builder, BuilderOptions } from "https://raw.githubusercontent.com/maemon4095/deno-esbuilder/release/v0.2.1/src/mod.ts";

const mode = Deno.args[0];

const wasmPack = new Deno.Command("wasm-pack", {
    args: [
        "build",
        "--dev",
        "--target",
        "web",
        "--mode",
        "no-install",
        "-d",
        "./dist/pkg"
    ]
});
await wasmPack.output();

const scriptFilePath = "./dist/pkg/min_wasm_rs.js";
let scriptText = await Deno.readTextFile(scriptFilePath);
scriptText = "import __wasmFilePath from './min_wasm_rs_bg.wasm';" + scriptText;
scriptText = scriptText.replaceAll("new URL('min_wasm_rs_bg.wasm', import.meta.url)", "__wasmFilePath");
await Deno.writeTextFile(scriptFilePath, scriptText);

const options: BuilderOptions = {
    documentFilePath: "./index.html",
    denoConfigPath: "./deno.json",
    outbase: "./src-ts",
    outdir: "./dist/web",
    loader: {
        ".wasm": "file"
    },
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false
};

const builder = new Builder(options);

switch (mode) {
    case "build":
        builder.build();
        break;
    case "serve":
        await builder.serve();
        break;
}

