import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { FirebaseContext } from '../firebase/context';
import useValidacion from '../hooks/useValidacion';
import { validarCrearCuenta } from '../helpers/validarCuenta';

import styles from "../styles/Formularios.module.css"
import { validarInicioSesion } from '../helpers/validarInicioSesion';

//estado inicial
const state_Inicial = {
    email: "",
    password: ""
}

const Login = () => {

    const [error, setError] = useState("");
    const router = useRouter();
    const { iniciarSesion } = useContext( FirebaseContext )

    const crearCuenta = async () => {
        
        try {
            const usuario = await iniciarSesion( email, password );
        } catch (error) {
            setError(error.code)
        }
    }

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(state_Inicial, validarInicioSesion, crearCuenta);
    const { email, password } = valores

    return (
        <div>
            <Layout>
                <h1 className={ styles.titulo_formulario }>Iniciar Sesión</h1>
                <form 
                    className={ styles.formulario } 
                    onSubmit={ handleSubmit }
                    noValidate
                >
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
                        value="Iniciar Sesión"
                    />
                </form>
            </Layout>
        </div>
    )
}

export default Login
