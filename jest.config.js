/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],

  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/"],
  coverageDirectory: "coverage",
};
