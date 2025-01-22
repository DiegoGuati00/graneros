import React, { Suspense, createContext, lazy, useState } from 'react';


const AuthContex = createContext();
const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState();
    const [authAdmin, setAuthAdmin] = useState(null);
    let data = {
        auth,
        setAuth,
        authAdmin,
        setAuthAdmin
    }
    return (<AuthContex.Provider value={data}>{children}</AuthContex.Provider>
    );
}
export {AuthProvider}
export default AuthContex;
