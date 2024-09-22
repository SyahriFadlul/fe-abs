import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './axios'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@vuikit/theme'
import '@vuikit/icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit'
import CKEditor from '@ckeditor/ckeditor5-vue';
import '../node_modules/nprogress/nprogress.css' 


// Import the CSS file to apply the default styling.

const pinia = createPinia()
const app = createApp(App)

// const persistedState = JSON.parse(localStorage.getItem('appState'));
// if (persistedState) {
//   pinia.state.value = persistedState;
// }

pinia.use(({ store }) =>{
    store.router = markRaw(router)
    // store.$subscribe((state) => {
    //     localStorage.setItem('appState', JSON.stringify(state));
    //   })
})
pinia.use(piniaPluginPersistedstate)

// console.log(decode('Ohaus Navigator&#8482; NV422'));
const text = "Ohaus Rangerâ„¢ 2000 Count RC21P1502"
console.log(import.meta.env.VITE_API_BASE_URL);

// app.use(encode())
// app.use(decode())
app.use(router)
UIkit.use(Icons)
app.use(CKEditor)


app.use(pinia)
app.mount('#app')
