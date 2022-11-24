import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword,GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithEmailAndPassword,signInWithPopup,signOut } from 'firebase/auth'
import app from '../../firebase/firebase.config';

export const AuthContext = createContext(); 

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email,password)=>{
        setLoading(true)
       return signInWithEmailAndPassword(auth,email,password)
    }
    const googleLogIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider);
    }
    const logOut = ()=>{
        localStorage.removeItem('name of  token');
        return signOut(auth)
    }
    useEffect( () =>{
       const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log(currentUser);
            setUser(currentUser);
            setLoading(false)
        });

        return () =>{
            return unsubscribe();
        }
    }, [])


    const authInfo = {
        user, 
        loading,
        createUser,
        login,
        googleLogIn,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;