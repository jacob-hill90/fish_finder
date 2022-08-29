import axios from 'axios'
import Cookies from 'js-cookie'
import {swals} from '../components/Swal';

//Setting the default csrftoken
axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');

async function signUpUser(data) {
    let response = await axios.post('/sign_up', data)
    return response
}

async function signOutUser() {
    let response = await axios.post('/sign_out')
    .then((response) => {
        swals(response)
    })
}

async function logInUser(data) {

    let response = await axios.post('/log_in', data)
    return response

}

async function whoAmI() {
    const response = await axios.get('/whoami')
    const user = response.data && response.data[0] && response.data[0].fields
    console.log('user? ', user)
    return user
}

async function updateUser(data, config) {
    let response = await axios.post('/edit_user', data, config)
    return response
}

export {
    signUpUser, 
    signOutUser,
    logInUser,
    whoAmI,
    updateUser
}