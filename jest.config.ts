import { Config } from "@jest/types"

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
      "^.+\\.ts?$": "ts-jest",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    setupFiles: ["./tests/jest-setup.ts"],
  }
}
