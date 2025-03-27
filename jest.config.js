module.exports = {
  testMatch: ["**/tests/**/*.test.js"],
  testTimeout: 10000,
  setupFilesAfterEnv: ["./pactum.config.js"],
};
