import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchFishByID } from '../api/FishDBAPI'
import FishDBFish from './FishDBFish'

function FishDBDetail(){

    let {fishID} = useParams()

    const [fish, setFish] = useState(null)

    useEffect(() => {

        let response = fetchFishByID(fishID)
        .then((response) => {

            setFish(response.data.data[0])
        })
        

    }, [fishID])


    return (
        <div className="fish-detail pt-5">
            <FishDBFish {...fish}/>
        </div>
    )
}

export default FishDBDetail
