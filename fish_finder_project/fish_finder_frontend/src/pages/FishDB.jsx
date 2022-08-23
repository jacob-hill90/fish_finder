import { useState, useEffect } from 'react'
import { fetchfish } from '../api/FishDBAPI'
import FishDBDisplay from '../components/FishDBDisplay'


function FishDB() {

    const [fish, setFish] = useState([])

    useEffect(() => {
        let response = fetchfish()
        .then((response) => {
            setFish(response.data.data)
            
        })
    }, [])

    return (
        <div>
            <FishDBDisplay fish={fish}/>
        </div>
    )
}

export default FishDB