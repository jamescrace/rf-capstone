import SessionContext from "context/sessionContext.js";
import {useCallback, useContext, useEffect, useState} from "react";
import * as cartService from "services/cart.js"
import LoadingSpinner from "shared-components/LoadingSpinner.jsx";
import CartItem from "./CartItem.jsx";
import {clsx} from "clsx";
import {motion} from "framer-motion";
const CartModal = (props) => {
    const {setCartOpen} = props;
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const {username} = useContext(SessionContext);

    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        const response = await cartService.getCart()
        setItems(await response.json())
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchCart();

    }, [fetchCart]);

    let totalQuantity = 0;
    for (const item of items) {
        totalQuantity += item.quantity;
    }

    let subTotal = 0;
    for (const item of items) {
        subTotal += item.price_per_unit * item.quantity;
    }

    return (
        <motion.div initial={{translateX:"100%"}} animate={{translateX: 0}} transition={{duration: 0.5}}
            className="bg-white h-screen w-full max-w-xl flex flex-col">
            <div className="bg-emerald-800 text-white font-playfair text-center py-7 text-3xl shadow-md">
                {username}&apos;s cart
            </div>
            {
                isLoading ? <LoadingSpinner/> : <>

                    <div className="flex-1 overflow-y-scroll pb-20">
                        {
                            items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={clsx("mx-4", idx !== 0 && "border-t border-slate-200")}>
                                    <CartItem item={item} fetchCart={fetchCart}/>
                                </div>
                            ))}

                    </div>
                    <div className="flex flex-col px-4 border-t border-slate-200 pb-4">
                        <div className="justify-between flex py-2 text-slate-400">
                            <div>{totalQuantity} items</div>
                            <div>subtotal
                                <span className="text-lg text-slate-500 ml-2">${subTotal}</span>
                            </div>
                        </div>
                        <button
                            className="bg-emerald-700 rounded-full flex justify-center py-3 text-lg text-white items-center"
                            onClick={() => alert("Not a real plant selling site :)")}>
                            checkout <i className="fa-regular fa-arrow-right-to-line text-2xl ml-2"/>
                        </button>
                    </div>
                </>
            }
        </motion.div>
    )
}

export default CartModal;