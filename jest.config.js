module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
};
