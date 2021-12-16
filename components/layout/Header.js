import Link from 'next/link'
import React from 'react'
import { Buscar } from '../UI/Buscar'
import { Navegacion } from './Navegacion';

import styles from "../../styles/Header.module.css";

export const Header = () => {
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
                <div>
                    <p>Hola: Leonardo</p>
                    <button
                        type='button'
                        >Cerrar Sesión</button>
                    <Link href="/">Login</Link>
                    <Link href="/">Crear Cuenta</Link>
                </div>
            </div>
        </header>
    )
}
