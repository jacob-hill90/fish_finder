import axios from 'axios'
import Cookies from 'js-cookie'

//Setting the default csrftoken
axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');

async function getForecast(user) {
    let response = await axios.get(`/forecast/${user.zipcode}`)
    return response
}

export default getForecast