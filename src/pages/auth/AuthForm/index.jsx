import {useState} from 'react';
import Field from "./Field.jsx";


const AuthForm = (props) => {
    const {fields, submitButtonLabel, onSubmit} = props;
    const [values, setValues] = useState(() => {
        const initialState = {};
        for (let field of fields) {
            initialState[field.label] = '';
        }
        return initialState;
    })
    const [isLoading, setIsLoading] = useState(false);
    return <form className="p-4 bg-white border border-slate-300 rounded-lg m-4 font-lato"
                 onSubmit={async (e) => {
                     e.preventDefault();
                     setIsLoading(true);
                     await onSubmit(values);
                     setIsLoading(false)
                 }}
    >
        {
            fields.map((field) => (

                    <Field label={field.label}
                           key={field.label}
                           type={field.type}
                           value={values[field.label]}
                           onChange={(e) => {
                               setValues({...values, [field.label]: e.target.value});
                           }}

                    />
                )
            )}
        <button
            className="bg-emerald-600 text-white w-full py-2 mt-4 text-white rounded-lg relative">
            {submitButtonLabel}
            {isLoading && <div className="absolute top-0 right-4 h-full flex items-center ">
                <i className="fa-solid fa-spinner animate-spin text-xl
                text-green-300  "></i>
            </div>
            }
        </button>
    </form>
}
export default AuthForm