import * as cartService from 'services/cart'

const CartItem = (props) => {
    const {item, fetchCart} = props;
    return <div className="flex mx-6 my-8">
        <img className="w-28 rounded-md" src={item.image_src}/>
        <div className="flex justify-between mx-4 flex-1">
            <div className="">
                <div className="text-xl font-playfair text-emerald-700">
                    {item.plant_name}
                </div>
                <div className="text-slate-500 flex my-1 ">
                    <div className="text-slate-400 w-14">color:</div>
                    {item.pot_color}
                </div>
                <div className="text-slate-500 flex my-1 ">
                    <div className="text-slate-400 w-14 ">qty:</div>
                    {item.quantity}
                </div>
            </div>
            <div className="flex flex-col justify-between items-end ">
                <div className="text-slate-500">
                    ${item.price_per_unit * item.quantity}
                </div>
                <button
                    className="text-slate-400 text-sm hover:text-red-800"
                    onClick={async () => {
                        await cartService.removeItemFromCart({itemId: item.id})
                        fetchCart();

                    }}
                >
                    <i className="fa-solid text-base fa-trash mr-1"/>
                    remove
                </button>
            </div>
        </div>
    </div>
}

export default CartItem;
