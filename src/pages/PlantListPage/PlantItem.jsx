import {clsx} from "clsx";
import {useState} from "react";
import {Link} from "react-router-dom";
import {POT_COLORS, getRandomIdx} from "shared-components/util.js";

const PlantItem = (props) => {
    const {plant} = props;
    const [imageIdx, setImageIdx] = useState(() => getRandomIdx(plant.images));

    return <div className="mx-5 my-8">
        <Link to={`/plants/${plant.id}`}>
            <img className="w-[280px] h-[320px] rounded-md" src={plant.images[imageIdx].src}/>
        </Link>
        <div className="flex justify-between my-3 ">
            <div className="text-xl font-playfair text-emerald-700">{plant.name}</div>
            <div className="text-lg text-emerald-600">${plant.price}</div>
        </div>
        <div className="justify-between flex">
            <div className="text-sm text-slate-500">{plant.images[imageIdx].pot_color}</div>
            <div className="flex">
                {
                    plant.images.map((image, idx) => <div
                            key={idx}
                            className={clsx("rounded-full w-5 h-5 m-[3px] border border-slate-300 ", POT_COLORS[image.pot_color],
                                imageIdx === idx && "outline outline-slate-400 outline-offset-2")}
                            onMouseEnter={() => setImageIdx(idx)}
                        >
                        </div>
                    )

                }
            </div>
        </div>
    </div>
}

export default PlantItem