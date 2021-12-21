import { useContext, useEffect, useState } from 'react'
import { DetallesProducto } from '../components/layout/DetallesProducto';
import { Layout } from '../components/layout/Layout'
import { FirebaseContext } from '../firebase/context';

export default function Home() {

  const [productos, setProductos] = useState([]);
  const { obtenerDatosColeccionOrdenado } = useContext( FirebaseContext )

  const obtenerDatos = async () => {
    const datos = await obtenerDatosColeccionOrdenado("productos", "creado");
    setProductos(datos)
  }

  useEffect(() => {
    obtenerDatos();
  }, [])

  return (
    <div>
        <Layout>
            <div className='listado-productos'>
                <div className='contenedor'>
                    <div className='bg-white'>
                        { 
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
