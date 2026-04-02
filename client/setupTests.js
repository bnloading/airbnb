import "@testing-library/jest-dom";

// Mock the config module
jest.mock("./src/config.js", () => ({
  default: {
    API_BASE_URL: "http://127.0.0.1:5002",
    API_PRODUCTION_URL: "https://airbnb-clone-64cu.onrender.com",
    UPLOADS_URL: "http://127.0.0.1:5002/uploads/",
    APP_NAME: "Qonaq",
    APP_VERSION: "1.0.0",
    APP_DESCRIPTION: "Қазақстандық тұрғын үй жалға беру платформасы",
    MAX_UPLOAD_SIZE: 10485760,
    SUPPORTED_IMAGE_TYPES: ["jpg", "jpeg", "png", "webp"],
  },
}));
