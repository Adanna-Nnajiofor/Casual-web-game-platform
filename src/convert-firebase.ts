import path from "path";
import { readFileSync } from "fs";

const jsonPath = path.resolve(__dirname, "firebase-service-account.json");
const json = readFileSync(jsonPath, "utf8");
