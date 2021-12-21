import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../firebase/context';

const Producto = () => {

    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);

    const { query: { id } } = useRouter();
    const { obtenerDocumento } = useContext( FirebaseContext );
    
    const documento = async () => {
         const documentoProducto = await obtenerDocumento("productos", id);
         if(documentoProducto.isExist){
             console.log("Existe")
         }else{
             console.log("No existe")
         }
    }

    useEffect(() => {
        if(id){
            documento();
        }
    }, [ id ])

    return ( 
        <h1>Desde {id}</h1>
    );
}
 
export default Producto;