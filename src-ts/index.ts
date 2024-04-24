import init, { greet } from "../dist/pkg/min_wasm_rs.js";
await init();
greet();