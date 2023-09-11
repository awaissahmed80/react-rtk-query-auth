import { useState } from 'react'
import { Button, Input, InputPassword } from '../../ui-components'
import { Link } from "react-router-dom"
import { authApi } from "../../redux/apis"
import { useDispatch  } from 'react-redux'
import { authActions } from '../../redux/slices'
import { useToast } from '../../hooks/useToast'

const Login = () => {

    const dispatch = useDispatch()    
    const [ errors, setErrors ] = useState(null)
    const [login, { isLoading: isLoggingIn }] = authApi.useLoginMutation();
    const toast = useToast(4000)

    const handleSubmit = async (e) => {
        e.preventDefault()        
        const formData = new FormData(e.currentTarget);
        const formValues =  {};
        for (const [key, value] of formData) {            
                formValues[key] = value || null;            
        }

        try{
            const res = await login(formValues).unwrap()
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
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm mx-10">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input 
                            label="Email Address"
                            error={errors?.email_address?.message}
                            type="email"
                            name="email_address"
                            icon="mail-fill"
                            placeholder="Email Address"
                        />                        
                    </div>
                    <div className="mb-6">
                        <InputPassword
                            error={errors?.password?.message}
                            label="Password"
                            icon="key-fill"
                            name="password"
                            placeholder="Password..."
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button isLoading={isLoggingIn} >Submit</Button>
                        <Link to="/register" className="text-primary-500 hover:underline">
                            Don&apos;t have an account?
                        </Link>                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
