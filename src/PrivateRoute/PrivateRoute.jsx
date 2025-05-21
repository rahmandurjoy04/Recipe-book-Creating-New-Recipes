import React, { useContext } from 'react';
import { valueContext } from '../Root';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(valueContext);
    const location = useLocation();

    if (loading) {
        return <>
            <div className='flex justify-center py-40 items-center'>
                <span className="loading loading-dots loading-xl"></span>
            </div>
        </>

    }
    if (!user) {
        return <Navigate state={{from:location?.pathname}} to={'/auth/login'}></Navigate>
    }
    return (
        children
    );
};

export default PrivateRoute;