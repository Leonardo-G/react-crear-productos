import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { DetallesProducto } from '../components/layout/DetallesProducto';
import { Layout } from '../components/layout/Layout'
import { FirebaseContext } from '../firebase/context';

const Buscar = () => {

    const { query: { q }} = useRouter();
    const [productos, setProductos] = useState([]);
    const { obtenerDatosColeccionOrdenado } = useContext( FirebaseContext )
  
    const obtenerDatos = async () => {
      const datos = await obtenerDatosColeccionOrdenado("productos", "creado", "desc");
      console.log(q)
      console.log(datos[0].nombre)
      const busqueda = datos.filter( dato => dato.nombre.toLowerCase() === q.toLowerCase() );
      setProductos(busqueda);
    }
  
    useEffect(() => {
        if(q){
            obtenerDatos();
        }
        //eslint-disable-next-line
    }, [q])


    return (
        <div>
            <Layout>
            <div className='listado-productos'>
                <div className='contenedor'>
                    <div className='bg-white'>
                        {   
                            productos.length > 0 &&
                            productos.map( producto => (
                                <DetallesProducto key={ producto.id } { ...producto }/>
                            ))
                        }
                    </div>
                </div>
            </div>
            </Layout>
        </div>
    )
}

export default Buscar
