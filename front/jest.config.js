module.exports = {
    transform: { "^.+\\.tsx?$": "ts-jest" },
    testEnvironment: "jsdom",
    testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx}"],
    coveragePathIgnorePatterns: ["/__tests__/"],
    coverageReporters: ["text", "lcov", "json-summary"],
    passWithNoTests: true,
  };
  
