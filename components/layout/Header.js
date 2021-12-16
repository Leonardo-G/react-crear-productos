import Link from 'next/link'
import React from 'react'
import { Buscar } from '../UI/Buscar'
import { Navegacion } from './Navegacion';

import styles from "../../styles/Header.module.css";

export const Header = () => {
    const usuario = true
    return (
        <header className={ styles.header }>
            <div className={ styles.contenedorHeader }>
                <div>
                    <Link href="/" passHref>
                        <p className={ styles.logo }>P</p>
                    </Link>
                    <Buscar />
                    <Navegacion />
                </div>
                <div className={ styles.cuenta}>
                    {
                        usuario 
                        ?   <>
                                <p className={ styles.cuenta_usuario }>Hola: Leonardo</p>
                                <button className="boton boton--orange">
                                        Cerrar Sesión
                                </button>
                            </>
                        :   <>
                                <Link href="/" passHref>
                                    <button className="boton boton--orange">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/" passHref>
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
