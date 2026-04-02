// Client-side configuration
const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5002",
  API_PRODUCTION_URL:
    import.meta.env.VITE_API_PRODUCTION_URL ||
    "https://airbnb-clone-64cu.onrender.com",

  // Uploads Configuration
  // NOTE: use import.meta.env.DEV which is set by Vite (true in dev mode)
  UPLOADS_URL:
    (import.meta.env.DEV
      ? `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5002"}`
      : `${import.meta.env.VITE_API_PRODUCTION_URL || "https://airbnb-clone-64cu.onrender.com"}`) +
    "/uploads/",

  // App Information
  APP_NAME: import.meta.env.VITE_APP_NAME || "Qonaq",
  APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
  APP_DESCRIPTION:
    import.meta.env.VITE_APP_DESCRIPTION ||
    "Қазақстандық тұрғын үй жалға беру платформасы",

  // Upload Configuration
  MAX_UPLOAD_SIZE: parseInt(import.meta.env.VITE_MAX_UPLOAD_SIZE) || 10485760, // 10MB
  SUPPORTED_IMAGE_TYPES: (
    import.meta.env.VITE_SUPPORTED_IMAGE_TYPES || "jpg,jpeg,png,webp"
  ).split(","),

  // Environment
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,

  // API URL (computed)
  get API_URL() {
    return this.IS_DEVELOPMENT ? this.API_BASE_URL : this.API_PRODUCTION_URL;
  },
};

export default config;

// Debug: Log configuration in development
if (config.IS_DEVELOPMENT) {
  console.log("🚀 App Configuration:", {
    API_URL: config.API_URL,
    APP_NAME: config.APP_NAME,
    APP_VERSION: config.APP_VERSION,
    ENVIRONMENT: config.IS_DEVELOPMENT ? "Development" : "Production",
    MAX_UPLOAD_SIZE: `${config.MAX_UPLOAD_SIZE / (1024 * 1024)}MB`,
    SUPPORTED_IMAGE_TYPES: config.SUPPORTED_IMAGE_TYPES,
  });
}
