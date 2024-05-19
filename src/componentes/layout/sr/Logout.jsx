import React, { useEffect } from 'react';

const Logout = () => {
    useEffect(() => {
        sessionStorage.removeItem("session")
        window.location.replace("/dashboard")
    }, []);
    return (
        <div>
            
        </div>
    );
}

export default Logout;
