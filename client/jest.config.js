export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "jest-svg-transformer",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transformIgnorePatterns: ["node_modules/(?!axios)/"],
  globals: {
    "import.meta": {
      env: {
        VITE_API_BASE_URL: "http://127.0.0.1:5002",
        VITE_API_PRODUCTION_URL: "https://airbnb-clone-64cu.onrender.com",
        VITE_APP_NAME: "Qonaq",
        VITE_APP_VERSION: "1.0.0",
        VITE_APP_DESCRIPTION: "Қазақстандық тұрғын үй жалға беру платформасы",
        VITE_MAX_UPLOAD_SIZE: "10485760",
        VITE_SUPPORTED_IMAGE_TYPES: "jpg,jpeg,png,webp",
        IS_DEVELOPMENT: true,
      },
    },
  },
};
