import React from 'react';

import { Navigate } from 'react-router-dom';

function DeveloperPrivate({children}) {
    const token=localStorage.getItem("token")
    const role=localStorage.getItem("role")
   
    if(token && (role=="developer")) {
        return children
    }
   
    return (
        <Navigate to="/" />
    );
}

export default DeveloperPrivate;