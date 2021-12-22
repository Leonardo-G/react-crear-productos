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
    const [comentario, setComentario] = useState({
        mensaje: ""
    })

    const { query: { id }, push } = useRouter();
    const { obtenerDocumento, usuario, actualizarCampos, borrarImagen, eliminarDocumento } = useContext( FirebaseContext );
    
    const documento = async () => {
         const documentoProducto = await obtenerDocumento("productos", id);
         if(documentoProducto.isExist){
             console.log(documentoProducto)
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

    const { nombre, creado, empresa, urlImagen, descripcion, comentarios, url, votos, creador, votantes } = producto
    
    const votarProducto = async () => {
        if(!usuario){
            return push("/login")
        }

        if(votantes.includes(usuario.uid)) return;


        //Actualizar en Firebase
        await actualizarCampos("productos", id, { votos: votos + 1, votantes: [...votantes, usuario.uid]})

        setProducto({
            ...producto,
            votos: votos + 1
        })
    }

    const crearComentario = async (e) => {
        e.preventDefault();

        if(!usuario){
            return push("/login")
        }

        //Informacion del comnetario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        //Tomar copia de comentario y agregarlo al arreglo
        const comentariosActual = [ ...comentarios, comentario ];

        //Actualizar Firebase
        await actualizarCampos( "productos", id, { comentarios: comentariosActual } );
        
        //Actualizar el state
        setProducto({
            ...producto,
            comentarios: comentariosActual
        })
        
        //Reiniciar el input
        setComentario({
            mensaje: ""
        });
    }

    //Identifica si el comentario es creador del productos
    const esCreador = (idComentario) => {
        if( creador.id === idComentario ){
            return true
        }
    }

    //Funcion que revisa que el creador del producto sea el mismo que esta autenticado
    const puedeBorrar = () => {
        if(!usuario) return false;

        if(creador.id === usuario.uid){
            return true;
        }
    }

    //Eliminar producto de la DB
    const eliminarProducto = async () => {
        await Promise.all([
            eliminarDocumento("productos", id),
            borrarImagen(urlImagen)
        ])
        push("/")
    }

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
                                {
                                    creador &&
                                    <p>Por: { creador.nombre } de { empresa }</p>
                                }
                                <img src={ urlImagen } alt={ nombre }/>
                                <p>{ descripcion }</p>
                                {
                                    usuario &&
                                    <>
                                        <h2>Agrega tu comentario</h2>
                                        <form onSubmit={ crearComentario }>
                                            <div className={ stylesForm.campo }>
                                                <input 
                                                    type="text"
                                                    name='mensaje'
                                                    onChange={ e => setComentario({
                                                        ...comentario,
                                                        [e.target.name]: e.target.value
                                                    }) }
                                                    value={ comentario.mensaje }
                                                    className={ stylesForm.campo_input }
                                                />
                                            </div>
                                            <input 
                                                type="submit"
                                                className='boton boton--orange block'
                                            />
                                        </form>
                                    </>
                                }
                                <h2>Comentarios</h2>
                                {
                                    comentarios && 
                                    comentarios.length === 0
                                    ?   <p>No hay comentarios</p>
                                    :
                                        <ul>
                                            {   
                                                comentarios &&
                                                comentarios.map( (comentario, idx) => (
                                                    <li 
                                                        key={idx + 1}
                                                        style={{ "border": "1px solid #e1e1e1", "padding": "2rem"}}    
                                                    >
                                                        <p>{ comentario.mensaje }</p>
                                                        <p>Escrito por: 
                                                            <span style={{ "fontWeight": "bold" }}> { comentario.usuarioNombre }</span>
                                                        </p>
                                                        {
                                                            esCreador( comentario.usuarioId ) &&
                                                            <p className={ styles.comentario_creador }>Creador</p>
                                                        }
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                }
                            </div>
                            <aside>
                                <a
                                    href={ url }
                                    target='_blank'
                                    className='boton boton--orange block'
                                    rel="noreferrer"
                                >Visitar URL</a>
                                {
                                    usuario &&
                                    <button
                                        onClick={ votarProducto }
                                        className='boton block boton--wh'
                                    >Votar</button>
                                }
                                <p style={{ "textAlign": "center" }}>{ votos } Votos</p>
                            </aside>
                        </div>
                        {
                            creador &&
                            puedeBorrar() &&
                            <button
                                className='boton boton--orange block'
                                onClick={ eliminarProducto }
                            >Eliminar Producto</button>
                        }
                    </div>
            }

        </Layout>
    );
}
 
export default Producto;