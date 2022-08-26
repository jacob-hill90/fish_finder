import swal from 'sweetalert'

function swals(response){

    return (
        swal({
            title: "Fishtories Admin Says:",
            text: response['data']['data'],
            icon: "success",
            button: {
                text: "Awesome Sauce!",
                value: true,
                visible: true,
                className: "",
                closeModal: true
            },
        })
    )
}

export default swals