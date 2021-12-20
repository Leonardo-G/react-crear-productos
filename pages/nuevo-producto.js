import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { Layout } from '../components/layout/Layout';
import { FirebaseContext } from '../firebase/context';
import { validarCrearProducto } from '../helpers/validarCrearProducto';
import { validarCrearCuenta } from '../helpers/validarCuenta';
import useValidacion from '../hooks/useValidacion';

import styles from "../styles/Formularios.module.css";

const state_Inicial = {
    nombre: "",
    empresa: "",
    url: "",
    descripcion: "",
}

const NuevoProducto = () => {

    const [error, setError] = useState("");
    const router = useRouter()
    const { usuario, agregarDatosColeccion } = useContext( FirebaseContext )

    const agregar = async () => {
        if(!usuario){
            router.push("/login");
        }
        
        //Objeto de nuevos productos
        const producto = {
            nombre,
            empresa,
            url,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now()
        }

        //Insertar la base de datos
        agregarDatosColeccion( producto, "productos" );
    }

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(state_Inicial, validarCrearProducto, agregar);
    const { nombre, empresa, imagen, url, descripcion } = valores

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
                                placeholder='Tu Nombre'
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
                        {/* <div className={ styles.campo }>
                            <label htmlFor='imagen' className={ styles.campo_label }>Imagen</label>
                            <input 
                                className={ styles.campo_input }
                                type="file"
                                id="imagen"
                                name='imagen'
                                value={imagen}
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />
                        </div>
                        {
                            errores.imagen && <p className={ styles.errores }>{ errores.imagen }</p>
                        } */}
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