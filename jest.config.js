module.exports = {
    collectCoverage: true,
    transform: {'\\.js$': 'babel-jest', },
    "verbose": false,
    "moduleNameMapper": {
        "\\.(css|less)$": "<rootDir>/js/__mocks__/styleMock.js"
      }
};