const FormContainer = (props) => {
    const {children} = props

    return (
        <div className="flex">
            <div className="relative hidden md:flex">
                <img src="https://static-task-assets.react-formula.com/capstone_sign_in_scene.png"
                     alt="image of plants on shelf"
                     className="h-screen object-cover"/>
                <div className="absolute top-0 left-0 bg-green-900/40 w-full h-full"></div>
            </div>
            <div className="flex flex-col items-center justify-center h-screen bg-green-50  flex-1">
                <div className="flex flex-col items-center mx-2 my-6">
                    <img src="https://static-task-assets.react-formula.com/capstone_logo_dark.png"
                         className="w-16 mb-2"/>
                    <div className="font-playfair text-3xl text-green-800">J's Plants</div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default FormContainer;