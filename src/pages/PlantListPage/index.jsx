import {useEffect, useState} from 'react';
import * as plantService from 'services/plant.js'
import NavBar from "shared-components/NavBar/index.jsx";
import RedirectToSigninIfSignedOut from "shared-components/RedirectToSigninIfSignedOut.jsx";
import PlantItem from "./PlantItem.jsx";
import LoadingSpinner from "../../shared-components/LoadingSpinner.jsx";
import {motion} from "framer-motion";

const PlantListPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [plantItems, setPlantItems] = useState([]);
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await plantService.getPlants();
            const data = await response.json()
            setPlantItems(data)
            setIsLoading(false);
        })()

    }, [])
    return <RedirectToSigninIfSignedOut>
        <NavBar/>
        <div className="min-h-screen bg-green-50">
            {isLoading ?
                <LoadingSpinner/>
                :
                <div className="flex justify-center py-24">
                    <div className="w-full max-w-5xl">
                        <div className="font-playfair text-4xl text-emerald-800 mb-6 px-4">Plants In Stock</div>
                        <div className="flex flex-wrap justify-center">
                            {
                                plantItems.map((plant, idx) =>
                                    <motion.div key={plant.name}
                                                initial={{opacity: 0, translateY: "20px"}}
                                                whileInView={{opacity: 1, translateY: "20px"}}
                                                viewport={{once: true}}
                                                transition={{delay: (idx % 3) * 0.2, duration: 0.4}}
                                    >
                                        <PlantItem plant={plant}/>
                                    </motion.div>)
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    </RedirectToSigninIfSignedOut>
}
export default PlantListPage