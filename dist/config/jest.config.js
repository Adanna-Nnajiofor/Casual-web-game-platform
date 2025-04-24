"use strict";
// setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["./jest.setup.ts"],
    testPathIgnorePatterns: ["/node_modules/"],
    coverageDirectory: "coverage",
};
