import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common['ngrok-skip-browser-warning'] = '1'; //ngrok API
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL 