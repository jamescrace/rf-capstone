const Field = (props) => {
    const {label, type, value, onChange} = props;

    return <div className="flex flex-col my-4">
        <label htmlFor={label} className="text-slate-500"> {label}</label>
        <input id={label}
               type={type}
               value={value}
               onChange={onChange}
               className="border bg-slate-50 border-slate-300 rounded-lg px-2 py-1
                       w-64 focus:outline-emerald-600"/>
    </div>
}
export default Field;