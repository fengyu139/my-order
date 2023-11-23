import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import NutUIResolver from "@nutui/nutui/dist/resolver";
import AutoImport from "unplugin-auto-import/vite";
import { VitePWA } from "vite-plugin-pwa";
import SvgLoader from "vite-svg-loader";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    SvgLoader(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: "./auto-import.d.ts",
      eslintrc: {
        // 自动生成一个ESLint配置文件，以便ESLint能够识别这些自动导入的库
        enabled: true,
        // 指定生成的ESLint配置文件的路径
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        // 设置自动导入的库在ESLint配置中的全局属性值
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      resolvers: [NutUIResolver()],
    }),
    VitePWA({
      manifest: {
        name: "orderApp",
        short_name: "orderApp",
        description: "orderApp App Description",
        start_url: "/index.html",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/path-to-icon.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  base: "./",
  server: {
    host: "0.0.0.0",
    port: 7776,
    open: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // "/uploads": {
      //   target: "http://127.0.0.1:8000/uploads",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/uploads/, ""),
      // },
      // "/socket.io": {
      //   target: "http://127.0.0.1:9000/", // target host
      //   changeOrigin: true, // needed for virtual hosted sites
      // },
      // "/sockjs-node": {
      //   target: "http://127.0.0.1:9000",
      //   ws: false,
      //   changeOrigin: true,
      // },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
