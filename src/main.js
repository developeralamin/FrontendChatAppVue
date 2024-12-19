import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import axios from "axios";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import router from './router';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd);


app.mount('#app')


import { useAuthenticateStore } from "./stores/authenticate";
const authenticate = useAuthenticateStore();
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
if (authenticate.token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${authenticate.token}`;
}
