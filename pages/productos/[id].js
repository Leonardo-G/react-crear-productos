import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Error404 } from '../../components/layout/404';
import { Layout } from '../../components/layout/Layout';
import { FirebaseContext } from '../../firebase/context';

import styles from "../../styles/Productos_id.module.css";
import stylesForm from "../../styles/Formularios.module.css";

const Producto = () => {

    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);

    const { query: { id } } = useRouter();
    const { obtenerDocumento } = useContext( FirebaseContext );
    
    const documento = async () => {
         const documentoProducto = await obtenerDocumento("productos", id);
         if(documentoProducto.isExist){
             setProducto(documentoProducto);
         }else{
             setError(true);
         }
    }

    useEffect(() => {
        if(id){
            documento();
        }
    }, [ id ])

    const { nombre, creado, urlImagen, descripcion, comentarios, url, votos } = producto

    return ( 
        <Layout>
            {
                error 
                ? 
                    <Error404 />
                :
                    <div className='contenedor'>
                        <h1 style={{"textAlign": "center", "marginTop": "5rem"}}>{ nombre }</h1>
                        <div className={ styles.contenedor_producto}>
                            <div>
                            {
                                ( new Date().getDay() - new Date(Number(creado)).getDay() ) == 0
                                ?   <p>Creado hace: { new Date().getHours() - new Date(Number(creado)).getHours() } Horas</p>
                                :   <p>Creado hace: { new Date().getDay() - new Date(Number(creado)).getDay() } Dia</p>
                            }
                                <img src={ urlImagen } alt={ nombre }/>
                                <p>{ descripcion }</p>
                                <h2>Agrega tu comentario</h2>
                                <form>
                                    <div className={ stylesForm.campo }>
                                        <input 
                                            type="text"
                                            name='mensaje'
                                            className={ stylesForm.campo_input }
                                        />
                                    </div>
                                    <input 
                                        type="submit"
                                        className='boton boton--orange block'
                                    />
                                </form>
                                <h2>Comentarios</h2>
                                {   
                                    comentarios &&
                                    comentarios.map( (comentario, idx) => (
                                        <li key={idx + 1}>
                                            <p>sdasd</p>
                                        </li>
                                    ))
                                }
                            </div>
                            <aside>
                                <a
                                    href={ url }
                                    target='_blank'
                                    className='boton boton--orange block'
                                    rel="noreferrer"
                                >Visitar URL</a>
                                <button
                                    className='boton block boton--wh'
                                >Votar</button>
                                <p style={{ "textAlign": "center" }}>{ votos } Votos</p>
                            </aside>
                        </div>
                    </div>
            }

        </Layout>
    );
}
 
export default Producto;