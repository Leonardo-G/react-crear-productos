import React, { createContext } from 'react';
import "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './config';
import { useAutenticacion } from '../hooks/useAutenticacion';

export const FirebaseContext = createContext();

export const FirebaseFn = ({ children }) => {

    const agregarUsuario = async ( nombre, email, password ) => {
        const nuevoUsuario = await createUserWithEmailAndPassword( auth, email, password );
        // console.log(nuevoUsuario);
        return await updateProfile( auth.currentUser, {
            displayName: nombre
        })

    }

    //Inicia sesión del usuario
    const iniciarSesion = async ( email, password ) => {
        return await signInWithEmailAndPassword( auth, email, password )
    }

    const usuario = useAutenticacion();
    
    return (
        <FirebaseContext.Provider value={{
            agregarUsuario,
            iniciarSesion,
            usuario
        }}>
            { children }
        </FirebaseContext.Provider>
    )
}
