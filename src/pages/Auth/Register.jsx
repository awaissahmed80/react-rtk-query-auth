import { useState } from 'react'
import { Button, Input, InputPassword } from '../../ui-components'
import { Link } from "react-router-dom"
import { authApi } from "../../redux/apis"
import { useDispatch  } from 'react-redux'
import { authActions } from '../../redux/slices'
import { useToast } from '../../hooks/useToast'


const Register = () => {

    const dispatch = useDispatch()    
    const [ errors, setErrors ] = useState(null)
    const [register, { isLoading: loading }] = authApi.useRegisterMutation();
    const toast = useToast(4000)

    const handleSubmit = async(e) => {
        e.preventDefault()        
        const formData = new FormData(e.currentTarget);
        const formValues =  {};
        for (const [key, value] of formData) {            
                formValues[key] = value || null;            
        }
        
        try{
            const res = await register(formValues).unwrap()            
            dispatch(authActions.setCredentials(res))            
        }
        catch(e){            
            toast('error', e?.message || e?.error);
            setErrors(e?.error)
            dispatch(authActions.clear())            
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-10">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-start gap-5">
                        <div className="flex-1">
                            <Input 
                                name="first_name"
                                error={errors?.first_name?.message}
                                label="First Name"                                
                                icon="user-fill"
                                placeholder="First Name"
                            />                        
                        </div>
                        <div className="flex-1">
                            <Input 
                                error={errors?.last_name?.message}
                                name="last_name"
                                label="Last Name"                                
                                icon="user-fill"
                                placeholder="Last Name"
                            />                        
                        </div>
                    </div>
                    <div className="mb-4">
                        <Input 
                            label="Email Address"
                            error={errors?.email_address?.message}
                            type="email"
                            icon="mail-fill"
                            name="email_address"
                            placeholder="Email Address"
                        />                        
                    </div>
                    <div className="lg:flex items-start gap-5 transition duration-500">
                        <div className="flex-1">
                            <InputPassword
                                label="Password"
                                icon="key-fill"
                                name="password"
                                error={errors?.password?.message}
                                placeholder="Password..."
                            />
                        </div>
                        <div className="flex-1">
                            <InputPassword
                                label="Password"
                                icon="key-fill"
                                name="confirm_password"
                                error={errors?.confirm_password?.message}
                                placeholder="Password..."
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button isLoading={loading} >Register</Button>
                        <Link to="/" className="text-primary-500 hover:underline">
                            Already have an account?
                        </Link>                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
