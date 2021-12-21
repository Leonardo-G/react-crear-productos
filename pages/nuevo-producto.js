import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { Layout } from '../components/layout/Layout';
import { storage } from '../firebase/config';
import { FirebaseContext } from '../firebase/context';
import { validarCrearProducto } from '../helpers/validarCrearProducto';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import useValidacion from '../hooks/useValidacion';

import styles from "../styles/Formularios.module.css";

const state_Inicial = {
    nombre: "",
    empresa: "",
    url: "",
    imagenUrl: "",
    descripcion: "",
}

const NuevoProducto = () => {

    const [imagen, setImagen] = useState(null)
    const [error, setError] = useState("");
    const router = useRouter()
    const { usuario, agregarDatosColeccion } = useContext( FirebaseContext )

    const agregar = async () => {
        if(!usuario){
            router.push("/login");
        }
        const imageRef = ref(storage, 'products/' + imagen.name)
        
        // const archivoPath = storageRef.child(image)
        const uploadTask = await uploadBytesResumable(imageRef, imagen)
        const urlImagen = await getDownloadURL(imageRef);
        
        //Objeto de nuevos productos
        const producto = {
            nombre,
            empresa,
            url,
            urlImagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador: {
                id: usuario.uid,
                nombre: usuario.displayName 
            }
        }

        //Insertar la base de datos
        await agregarDatosColeccion( producto, "productos" );

        return router.push("/");
    }

    const handleFileImg = e => {
        setImagen(e.target.files[0]);
    }

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(state_Inicial, validarCrearProducto, agregar);
    const { nombre, empresa, url, descripcion } = valores

    return (
        <div>
            <Layout>
                <h1 className={ styles.titulo_formulario }>Nuevo Producto</h1>
                <form 
                    className={ styles.formulario } 
                    onSubmit={ handleSubmit }
                    noValidate
                >
                    <fieldset className={ styles.fieldset}>
                        <legend>Información General</legend>
                        <div className={ styles.campo }>
                            <label htmlFor='nombre' className={ styles.campo_label }>Nombre</label>
                            <input 
                                className={ styles.campo_input }
                                type="text"
                                id="nombre"
                                placeholder='Nombre del Producto'
                                name='nombre'
                                value={nombre}
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />
                        </div>
                        {
                            errores.nombre && <p className={ styles.errores }>{ errores.nombre }</p>
                        }
                        <div className={ styles.campo }>
                            <label htmlFor='empresa' className={ styles.campo_label }>Empresa</label>
                            <input 
                                className={ styles.campo_input }
                                type="text"
                                id="empresa"
                                placeholder='Nombre Empresa o Compañia'
                                name='empresa'
                                value={empresa}
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />
                        </div>
                        {
                            errores.empresa && <p className={ styles.errores }>{ errores.empresa }</p>
                        }
                        <div className={ styles.campo }>
                            <label htmlFor='imagen' className={ styles.campo_label }>Imagen</label>
                            <input
                                className={ styles.campo_input }
                                type="file"
                                accept='image/*'
                                id="imagen"
                                name='imagen'
                                onChange={ handleFileImg }
                                onBlur={ handleBlur }
                            />
                        </div>
                        {
                            errores.imagen && <p className={ styles.errores }>{ errores.imagen }</p>
                        } 
                        <div className={ styles.campo }>
                            <label htmlFor='url' className={ styles.campo_label }>URL</label>
                            <input 
                                className={ styles.campo_input }
                                type="url"
                                id="url"
                                name='url'
                                value={url}
                                placeholder="URL de tu producto"
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />
                        </div>
                        {
                            errores.url && <p className={ styles.errores }>{ errores.url }</p>
                        }
                    </fieldset>
                    <fieldset className={ styles.fieldset}>
                        <legend>Sobre tu Producto</legend>
                        <div className={ styles.campo }>
                            <label htmlFor='descripcion' className={ styles.campo_label }>Descripción</label>
                            <input 
                                className={ styles.campo_textarea }
                                type="textarea"
                                id="descripcion"
                                name='descripcion'
                                value={descripcion}
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />
                        </div>
                        {
                            errores.descripcion && <p className={ styles.errores }>{ errores.descripcion }</p>
                        }
                    </fieldset>
                        {
                            error !== "" && <p className={ styles.errores }>{ error }</p>
                        }
                        <input 
                            className='boton boton--orange block'
                            type="submit"
                            value="Crear Producto"
                        />
                </form>
            </Layout>
        </div>
    )
}

export default NuevoProducto