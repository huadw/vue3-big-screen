import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import DataVVue3 from "@kjgl77/datav-vue3";
import '@/assets/scss/index.scss';
import '@/assets/icon/iconfont.css';
// 引入 全局注册组件
import CustomEcharts from '@/components/index';

// import { setupDirective } from "@/directive";
import { setupStore } from "@/store";
const app = createApp(App);
// 全局注册 自定义指令(directive)
// setupDirective(app);
// 全局注册 状态管理(store)
setupStore(app);
app.use(router).use(CustomEcharts).use(DataVVue3).mount("#app");
