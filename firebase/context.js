import React, { createContext } from 'react';
import "firebase/auth";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './config';

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

    return (
        <FirebaseContext.Provider value={{
            agregarUsuario,
            iniciarSesion
        }}>
            { children }
        </FirebaseContext.Provider>
    )
}
