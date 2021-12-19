import Link from 'next/link'
import React, { useContext } from 'react'
import { Buscar } from '../UI/Buscar'
import { Navegacion } from './Navegacion';

import styles from "../../styles/Header.module.css";
import { FirebaseContext } from '../../firebase/context';
import { useRouter } from 'next/router';

export const Header = () => {

    const { usuario, cerrarSesion } = useContext( FirebaseContext );
    const route = useRouter()

    const cerrarCuenta = () => {
        cerrarSesion();
        route.push("/login")
    }

    return (
        <header className={ styles.header }>
            <div className={ styles.contenedorHeader }>
                <div className={ styles.flex }>
                    <Link href="/" passHref>
                        <p className={ styles.logo }>P</p>
                    </Link>
                    <Buscar />
                    <Navegacion />
                </div>
                <div className={ styles.flex }>
                    {
                        usuario 
                        ?   <>
                                <p className={ styles.cuenta_usuario }>{ usuario.displayName }</p>
                                <button 
                                    className="boton boton--orange"
                                    onClick={ cerrarCuenta }    
                                >
                                        Cerrar Sesión
                                </button>
                            </>
                        :   <>
                                <Link href="/login" passHref>
                                    <button className="boton boton--orange">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/crear-cuenta" passHref>
                                    <button className="boton boton--wh">
                                        Crear Cuenta
                                    </button>
                                </Link>
                            </>
                    }
                </div>
            </div>
        </header>
    )
}
