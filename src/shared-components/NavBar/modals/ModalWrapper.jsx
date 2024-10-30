import {useRef} from 'react';
import {RemoveScroll} from "react-remove-scroll";

const ModalWrapper = (props) => {
    const {children, isOpen, onCloseClick} = props
    const backgroundDivRef = useRef();
    if (!isOpen) {
        return null;
    }
    return (
        <RemoveScroll>
            <div
                ref={backgroundDivRef}
                className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm flex justify-end items-start font-lato z-20"
                onClick={(e) => {
                    if (e.target === backgroundDivRef.current) {
                        onCloseClick();
                    }
                }}
            >
                <button className="absolute top-0 right-0 " onClick={onCloseClick}>
                    <i className="fa-regular fa-circle-xmark text-3xl text-emerald-400 p-4"/>
                </button>
                {children}
            </div>
        </RemoveScroll>
    )

}
export default ModalWrapper;