import { read } from "./api/index.js";

console.log(await read(["name", "mass"], "14 Her c"));
