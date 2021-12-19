import { route } from 'next/dist/server/router';
import { Router, useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { FirebaseContext } from '../firebase/context';
import { validarCrearCuenta } from '../helpers/validarCuenta';
import useValidacion from '../hooks/useValidacion';

import styles from "../styles/Formularios.module.css"

const state_Inicial = {
    nombre: "",
    email: "",
    password: ""
}

const CrearCuenta = () => {

    const [error, setError] = useState("");
    const router = useRouter()
    const { agregarUsuario } = useContext( FirebaseContext )

    const crearCuenta = async () => {
        try {
            const usuarioNuevo = await agregarUsuario( nombre, email, password );
            router.push("/")
        } catch (error) {
            console.log(error.message);
            setError(error.message)
        }
    }

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(state_Inicial, validarCrearCuenta, crearCuenta);
    const { nombre, email, password } = valores

    return (
        <div>
            <Layout>
                <h1 className={ styles.titulo_formulario }>Crear Cuenta</h1>
                <form 
                    className={ styles.formulario } 
                    onSubmit={ handleSubmit }
                    noValidate
                >
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
                        <label htmlFor='email' className={ styles.campo_label }>Email</label>
                        <input 
                            className={ styles.campo_input }
                            type="email"
                            id="email"
                            placeholder='Tu Email'
                            name='email'
                            value={ email }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        />
                    </div>
                    {
                        errores.email && <p className={ styles.errores }>{ errores.email }</p>
                    }
                    <div className={ styles.campo }>
                        <label htmlFor='password' className={ styles.campo_label }>Password</label>
                        <input 
                            className={ styles.campo_input }
                            type="password"
                            id="password"
                            placeholder='Tu Password'
                            name='password'
                            value={ password }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        />
                    </div>
                    {
                        errores.password && <p className={ styles.errores }>{ errores.password }</p>
                    }
                    {
                        error !== "" && <p className={ styles.errores }>{ error }</p>
                    }
                    <input 
                        className='boton boton--orange block'
                        type="submit"
                        value="Crear Cuenta"
                    />
                </form>
            </Layout>
        </div>
    )
}

export default CrearCuenta
