import { createApp } from "vue";
import dayjs from "dayjs";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "./style/tailwind.scss";
import VueLuckyCanvas from "@lucky-canvas/vue";
import "@nutui/nutui/dist/packages/dialog/style";
import "@nutui/nutui/dist/packages/toast/style";
import "@nutui/nutui/dist/packages/notify/style";
import { createPinia } from "pinia";
import { registerServiceWorker } from "./serviceWorker/register";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueLuckyCanvas);

// 注册 Service Worker
registerServiceWorker();

app.mount("#app");
app.directive("FormatTime", (el, binding: any) => {
  if (binding.value) {
    el.innerHTML = dayjs(binding.value).format("YYYY-MM-DD HH:mm:ss");
  } else {
    el.innerHTML = "-";
  }
});
// document.addEventListener("touchstart", function (event) {
//   event.preventDefault();
// });
