import "./mock/user"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // 导入路由配置
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css'

const app = createApp(App);
const pinia = createPinia();

app.use(router); // 使用路由
app.use(pinia);  // 使用 Pinia
app.mount('#app');