import React, { createContext } from 'react';
import "firebase/auth";
import { applyActionCode, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth, db } from './config';
import { useAutenticacion } from '../hooks/useAutenticacion';
import { addDoc, collection } from 'firebase/firestore';

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

    //Cerrar sesion
    const cerrarSesion = async () => {
        await signOut( auth )
    }

    //Crear productos
    const agregarDatosColeccion = async ( datos, coleccion ) => {
        
        return await addDoc( collection( db, coleccion ), datos );
    }

    return (
        <FirebaseContext.Provider value={{
            agregarUsuario,
            iniciarSesion,
            usuario,
            cerrarSesion,
            agregarDatosColeccion
        }}>
            { children }
        </FirebaseContext.Provider>
    )
}
