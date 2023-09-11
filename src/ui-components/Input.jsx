import { useState } from "react"
import { Icon } from "."
import PropTypes from 'prop-types'

const Input =  ({label, icon, error, ...rest}) => (
    <>
        <div className="block mb-4">
            <label className="block">
                { label && <span className="text-slate-500 text-sm">{label}</span>}
                <div className="relative">
                    { icon && 
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                            <Icon name={icon} />
                        </div>
                    }
                    <input className={`border ${icon && 'pl-10'} ${error && "border-red-500"} h-10  placeholder-slate-400 border-slate-400 transition-all duration-800 rounded w-full py-2 px-3 text-gray-700 focus:border-primary-500 leading-tight  focus:outline focus:ring-1 focus:ring-primary-500 focus:shadow-outline `}  {...rest} />   
                </div>
            </label>
            {
                error && 
                <p className="m-0 text-sm text-red-500">{error}</p>
            }
        </div>
    </>
)

const InputPassword = ({label, icon, error, ...rest}) => {
    
    const [ show, setShow ] = useState(false)
    return(
        <>
            <div className="block mb-4">
                <label className="block">
                { label && <span className="text-slate-500 text-sm">{label}</span>}                            
                    <div className="relative">                    
                        { icon && 
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                <Icon name={icon} />
                            </div>
                        }
                        <input className={`border ${error && "border-red-500"} ${icon && 'pl-10'} h-10  placeholder-slate-400 border-slate-400 transition-all duration-800 rounded w-full py-2 px-3 text-gray-700 focus:border-primary-500 leading-tight  focus:outline focus:ring-1 focus:ring-primary-500 focus:shadow-outline `} type={show ? "text" : "password"} {...rest} />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                            <button onClick={() => setShow(!show)} type="button" className={`px-4 font-semibold text-md ${show ? 'text-primary-500 hover:text-primary-600' : 'text-slate-400 hover:text-slate-600'} `}>
                                { show ? <Icon name="eye-fill" /> : <Icon name="eye-off-fill" /> }
                            </button>
                        </div>
                    </div>
                </label>
                {
                    error && 
                    <p className="m-0 text-sm text-red-500">{error}</p>
                }
            </div>
            
        </>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.string
}

InputPassword.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.string
}

export {Input, InputPassword}