import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [verifiedUser, setVerifiedUser] = useState(null);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, { withCredentials: true })
            .then((res) => { setVerifiedUser(res.data) })
            .catch(() => { setVerifiedUser(null) });
    }, [])

    return (
        <div>
            <AuthContext.Provider value={{ verifiedUser, setVerifiedUser }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider
