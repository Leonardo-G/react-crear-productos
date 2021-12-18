import React from 'react';
import { Layout } from '../components/layout/Layout';
import { validarCrearCuenta } from '../helpers/validarCuenta';
import useValidacion from '../hooks/useValidacion';

import styles from "../styles/Formularios.module.css"

const state_Inicial = {
    nombre: "",
    email: "",
    password: ""
}

const CrearCuenta = () => {

    const crearCuenta = () => {
        console.log("creando cuenta")
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
