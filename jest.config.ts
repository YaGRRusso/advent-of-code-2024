import { Config } from "jest";
  
const config: Config = {
  rootDir: './',
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  moduleNameMapper: { '^@/(.*)$': ['<rootDir>/src/$1'] },
}

export default config;