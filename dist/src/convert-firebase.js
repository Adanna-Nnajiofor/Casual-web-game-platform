"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const jsonPath = path_1.default.resolve(__dirname, "firebase-service-account.json");
const json = (0, fs_1.readFileSync)(jsonPath, "utf8");
