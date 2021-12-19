import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';

export const useAutenticacion = () => {

    const [usuarioAutenticado, setusuarioAutenticado] = useState(null);

    useEffect(() => {

        const unsuscribe = onAuthStateChanged( auth, (user) => {
            if( user ){
                setusuarioAutenticado( user )
            }else{
                setusuarioAutenticado( null )
            }
            
        })
        return () => unsuscribe();

    }, [])

    return usuarioAutenticado
}