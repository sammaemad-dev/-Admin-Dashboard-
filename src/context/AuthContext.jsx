import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {getme , login as loginApi , logout as logoutApi} from '../api/auth.api';

const AuthContext = createContext();

export const AuthProvider = ({children})=> {
    const [user , setUser] = useState(null);
    const [token , setToken] = useState(()=> localStorage.getItem('token'))
    const [loading , setLoading] = useState(true);
    
    const fetchCurrentUser = async ()=>{
        try {
            const {data} = await getme()
            setUser(data.user)
        }catch {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token')
        }finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCurrentUser()
    } , [])


    const login = async(payload)=>{
        const {data} = await loginApi(payload);
         if (data.token){
            localStorage.setItem('token' , data.token);
            setToken(data.token)
            setUser(data.user)
         };
         return data
    }

    const logout = async()=>{
        try{
            await logoutApi()
        }finally{
            localStorage.removeItem('token');
            setToken(null) 
            setUser(null)
        }
    }

    const isAuthenticated = Boolean(token) 

    const value = useMemo(()=>({ user , token , loading , refreshUser : fetchCurrentUser , login , logout , isAuthenticated }) , [user , token , loading])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext)


