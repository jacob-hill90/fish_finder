import axios from 'axios'
import swal from 'sweetalert'
import Cookies from 'js-cookie'

//Setting the default csrftoken
axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');

//Custom Alert
function alert_call(response, url) {
    swal({
        title: "The Recipe Box Says:",
        text: response['data']['data'],
        icon: "success",
        button: {
            text: "Awesome Sauce!",
            value: true,
            visible: true,
            className: "",
            closeModal: true
        },
    }).then( () => {
        window.location.href = `${url}`;
    });
    
};


async function fetchfish() {
    try {
        const response = await axios.get('/fishdb')

        return response
    }
    catch (error) { error_call('Error while loading page: ', error) }
}

async function fetchFishByID(fishID) {
    let response = await axios.get('/fishdbbyid', {
        params: {
            ID: fishID
        }
    })
    return response
}



export {
    fetchfish,
    fetchFishByID,
}