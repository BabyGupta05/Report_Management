import React from 'react';

import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
    const token=localStorage.getItem("token")
    const role=localStorage.getItem("role")
   
    if(token && (role=="manager" || role=="lead")) {
        return children
    }
    
    return (
        <Navigate to="/" />
    );
}

export default PrivateRoute;