import {useContext, useState} from "react";
import SessionContext from "../../context/sessionContext.js";
import {Link} from "react-router-dom";
import CartModal from "./modals/CartModal/index.jsx";
import ModalWrapper from "./modals/ModalWrapper.jsx";
import MobileMenuModal from "./modals/MobileMenuModal.jsx";

const NavBar = () => {
    const {username, signOut} = useContext(SessionContext);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <>
            <nav
                className="bg-emerald-800 flex justify-center font-lato"
                onMouseLeave={() => setUserMenuOpen(false)}
            >
                <div className="w-full max-w-5xl items-center flex justify-between px-8 py-2">
                    <Link to="/plants">
                        <div className="text-2xl text-white items-center flex flex-col font-playfair">
                            <img src="https://static-task-assets.react-formula.com/capstone_logo_light.png"
                                 alt="rica's plants logo" className="w-10"/>
                            J&apos;s Plants
                        </div>
                    </Link>
                    <div className=" hidden flex-1 justify-end sm:flex ">
                        <div className="relative min-w-32">
                            <button className="text-emerald-500 flex items-center"
                                    onClick={() => setUserMenuOpen(true)}>
                                <i className="fa-solid fa-user mr-2 text-xl"/>
                                {username}
                            </button>
                            {
                                userMenuOpen &&
                                <div className="absolute bottom-[-48px]  bg-slate-50 rounded shadow-md">
                                    <button className="px-4 py-2 text-slate-500 hover:text-emerald-700"
                                            onClick={signOut}>
                                        <i className="mr-2 fa-solid fa-arrow-right-from-bracket"/>
                                        sign out
                                    </button>
                                </div>
                            }
                        </div>
                        <button className="text-emerald-200 flex items-center"
                                onClick={() => setCartOpen(true)}>

                            <i className="mr-2 text-xl fa-solid fa-cart-shopping"/>
                            cart
                        </button>
                    </div>
                    <button className="flex sm:hidden"
                            onClick={() => setMobileMenuOpen(true)}>

                        <i className="text-4xl fa-solid fa-bars text-emerald-400"/>
                    </button>
                </div>
            </nav>
            <ModalWrapper isOpen={cartOpen} onCloseClick={() => setCartOpen(false)}>
                <CartModal setCartOpen={setCartOpen}/>
            </ModalWrapper>
            <ModalWrapper isOpen={mobileMenuOpen} onCloseClick={() => setMobileMenuOpen(false)}>
                <MobileMenuModal onCartOpenClick={() => {
                    setCartOpen(true);
                    setMobileMenuOpen(false);
                }}/>
            </ModalWrapper>
        </>

    );
}
export default NavBar;
