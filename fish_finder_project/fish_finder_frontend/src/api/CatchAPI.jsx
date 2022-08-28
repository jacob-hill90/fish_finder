import axios from 'axios'
import Cookies from 'js-cookie'
import {swals} from '../components/Swal';

//Setting the default csrftoken
axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');

function getUserCatches() {
    let response = axios.get('/catch')
    return response
}

async function saveCatch(data, config) {
    let response = await axios.post('/catch', data, config)
    return response
}

async function updateCatch(data, config) {
    let response = await axios.post('/update_catch', data, config)
    return response
}






export {
    getUserCatches,
    saveCatch,
    updateCatch
}