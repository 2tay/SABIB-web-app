import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        logged: false,
        data: {},
        validInfos: true,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setAuth(prev => ({
                ...prev,
                logged: true,
                data: user
            }));
        }else{
            console.log("authProvider: there is no user in localStorage: ", user);
        }

        setLoading(false);
    }, []);



    const [successLogin, setSuccessLogin] = useState(false);

    const login = async (username, password) => {
        try {
            const response = await axios.get("http://localhost:8000/users");
            if (response.status === 200) {
                const users = response.data;
                const user = users.find(u => (u.username === username && u.password === password));
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    setSuccessLogin(true);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setSuccessLogin(false);
                    setAuth(prev => ({
                        ...prev,
                        logged: true,
                        data: user
                    }))
                } 
                else {
                    console.log("user doesn't exist");
                    
                    setAuth(prev => ({
                        ...prev,
                        validInfos: false,
                        logged: false,
                    }));
                    
                    setTimeout(() => {
                        setAuth(prev => ({
                            ...prev,
                            validInfos: true,
                        }));
                    }, 1000);
                }
            }
        } catch (err) {
            console.error("Error fetching data: ", err);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setAuth({
            logged: false,
            data: {},
            validInfos: true,
        })
    }

    const contextValues = { auth, setAuth, login, successLogin, loading, logout }

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
