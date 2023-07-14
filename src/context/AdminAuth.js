import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

    // Function to update the adminToken in the context
    const updateToken = (newToken) => {
        setAdminToken(newToken);
    };

    return (
        <AdminAuthContext.Provider value={{ adminToken, updateToken }}>
            {children}
        </AdminAuthContext.Provider>
    );
}