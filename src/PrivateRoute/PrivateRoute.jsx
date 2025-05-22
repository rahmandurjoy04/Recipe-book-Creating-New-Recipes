import React, { useContext } from 'react';
import { valueContext } from '../Root';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, authLoading } = useContext(valueContext);
    const location = useLocation();

    if (authLoading) {
        return <>
            <div className='flex justify-center py-40 items-center'>
                <span className="loading loading-dots loading-xl"></span>
            </div>
        </>

    }

    if (!user ||!user?.email) {
        return <Navigate state={{from:location?.pathname}} to={'/auth/login'}></Navigate>
    }
    return (
        children
    );
};

export default PrivateRoute;