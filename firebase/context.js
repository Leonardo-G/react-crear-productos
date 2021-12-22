import React, { createContext } from 'react';
import "firebase/auth";
import { applyActionCode, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth, db, storage } from './config';
import { useAutenticacion } from '../hooks/useAutenticacion';
import { ref, deleteObject } from '@firebase/storage';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';

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

    const obtenerDatosColeccionOrdenado = async ( coleccion, campo, order ) => {
        const docs = await getDocs( query(collection( db, coleccion ), orderBy( campo, order )) );
        
        let array = []
        docs.forEach( doc => {
            array.push({
                id: doc.id,
                ...doc.data()
            }) 
        })
        return array
    }

    //Obtener un Documento
    const obtenerDocumento = async ( coleccion, documentoId ) => {
        const documento = await getDoc( doc(db, coleccion, documentoId) );
        return {
            ... documento.data(),
            isExist: documento.exists()
        }
    }

    const actualizarCampos = async ( coleccion, documentoId, campos ) => {
        await updateDoc( doc(db, coleccion, documentoId), campos)
    }

    //Eliminar Campos
    const eliminarDocumento = async ( coleccion, documentoId ) => {
        await deleteDoc( doc(db, coleccion, documentoId) );
    }

    const borrarImagen = async (refUrl) => {
        const refImage = ref( storage, refUrl );
        await deleteObject( refImage );
    }

    return (
        <FirebaseContext.Provider value={{
            agregarUsuario,
            iniciarSesion,
            usuario,
            cerrarSesion,
            agregarDatosColeccion,
            obtenerDatosColeccionOrdenado,
            obtenerDocumento,
            actualizarCampos,
            eliminarDocumento,
            borrarImagen
        }}>
            { children }
        </FirebaseContext.Provider>
    )
}
