import { useEffect, Suspense, lazy } from 'react';
import { Route, Routes as Switch, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const Home = lazy(() => import('../pages/Home'));

const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};



const Routes = () => {

    const { auth: { user, token } } = useAuth()

    return (
        <Suspense fallback={<div />}>
            <ScrollToTop />
            <Switch>
                {
                    (!user || !token) ?
                    <>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                    :
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                }
                
            </Switch>
        </Suspense>
    );
};

export default Routes;
