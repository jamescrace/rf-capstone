import {clsx} from "clsx";
import {POT_COLORS} from "../../shared-components/util.js";
import {useState} from "react";
import * as cartService from 'services/cart.js'

const PlantPurchaseOptions = (props) => {
    const {plant, imageIdx, setImageIdx} = props;
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    return <>
        <div className='my-10'>
            <div className="text-emerald-700 flex">
                <i className="fa-solid fa-brush text-2xl mr-2"/>
                <div className="text-xl">Pot Colors</div>
            </div>
            <div className="flex my-4">
                {
                    plant.images.map((image, idx) => (
                        <div key={image.pot_color}
                             className="mx-2 flex flex-col items-center"
                             onMouseEnter={() => setImageIdx(idx)}

                        >
                            <div className={clsx("rounded-full w-10 h-10 m-1",
                                POT_COLORS[image.pot_color],
                                imageIdx === idx && "outline outline-slate-500 outline-offset-2"
                            )}></div>
                            <div className={clsx("mt-1", imageIdx == idx ? "text-slate-700" : "text-slate-500")}>
                                {image.pot_color}
                            </div>

                        </div>
                    ))}
            </div>
        </div>
        <div className="flex">
            <div className="rounded-full flex items-center text-slate-500 border-2 border-slate-300 px-3 py-4 ">
                <button onClick={() => {
                    if (quantity > 1) {
                        setQuantity(quantity - 1)
                    }
                }}
                >
                    <i className="fa-solid fa-minus"/>
                </button>
                <div className="mx-4 text-emerald-700 text-2xl">
                    {quantity}
                </div>
                <button onClick={() => {
                    setQuantity(quantity + 1)
                }}>
                    <i className="fa-solid fa-plus"/>
                </button>
            </div>
            <button
                className="flex items-center justify-center mx-1 flex-1 rounded-full bg-emerald-700 text-white text-xl hover:bg-emerald-800"
                onClick={async () => {
                    setIsLoading(true);
                    await cartService.addPlantToCart({
                        plantId: plant.id,
                        quantity,
                        potColor: plant.images[imageIdx].pot_color
                    });
                    setIsLoading(false);
                }}
            >
                {
                    isLoading ? <i className="mr-2 text-2xl fa-solid fa-spinner animate-spin"/>
                        :
                        <i className="fa-solid fa-cart-plus text-2xl mr-2"/>

                }
                add to cart
            </button>
        </div>
    </>

}
export default PlantPurchaseOptions;