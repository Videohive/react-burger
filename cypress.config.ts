import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1280,  // Ширина окна браузера
    viewportHeight: 720,  // Высота окна браузера
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    viewportWidth: 1280,  // Ширина окна браузера для компонентных тестов
    viewportHeight: 720,  // Высота окна браузера для компонентных тестов
  },
});
