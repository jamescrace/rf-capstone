import NavBar from "shared-components/NavBar/index.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as plantService from "services/plant";
import LoadingSpinner from "shared-components/LoadingSpinner.jsx";
import PlantInfoSection from "./PlantInfoSection.jsx";

const PlantShowPage = () => {
    const [plant, setPlant] = useState(null);
    const {plantId} = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await plantService.getPlantById({id: plantId})
            const data = await response.json()
            setPlant(data);
            setIsLoading(false);
        })()
    }, [plantId]);
    return <>
        <NavBar/>
        <div className="flex justify-center bg-green-50 min-h-screen font-lato">
            <div className="w-full max-w-5xl px-8 py-24">
                {isLoading ? <LoadingSpinner/>
                    :
                    <PlantInfoSection plant={plant}/>
                }
            </div>
        </div>
    </>

}

export default PlantShowPage