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

function swalse(response){

    return (
        swal({
            title: "Fishtories Admin Says:",
            text: response['data']['data'],
            icon: "error",
            button: {
                text: "Bummer!",
                value: true,
                visible: true,
                className: "",
                closeModal: true
            },
        })
    )
}

export {
    swals,
    swalse,
}