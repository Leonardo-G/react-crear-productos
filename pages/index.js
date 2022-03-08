import { useContext, useEffect, useState } from 'react'
import { DetallesProducto } from '../components/layout/DetallesProducto';
import { Layout } from '../components/layout/Layout'
import { FirebaseContext } from '../firebase/context';

export default function Home() {

  const [productos, setProductos] = useState([]);
  const { obtenerDatosColeccionOrdenado } = useContext( FirebaseContext )

  const obtenerDatos = async () => {
    const datos = await obtenerDatosColeccionOrdenado("productos", "creado", "desc");
    setProductos(datos)
    console.log(datos)
  }

  useEffect(() => {
    obtenerDatos();
    //eslint-disable-next-line
  }, [])

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
