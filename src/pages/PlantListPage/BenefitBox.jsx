import {clsx} from "clsx";

const BenefitBox = (props) => {
    const {icon, title, description} = props;


    return <>
        <div className="flex flex-col items-center flex-1 p-2">
            <i className={clsx("text-emerald-700 text-3xl", icon)}/>
            <div className="text-slate-700 my-1">{title}</div>
            <div className="text-sm text-slate-500 text-center">{description}</div>
        </div>
    </>
}

export default BenefitBox