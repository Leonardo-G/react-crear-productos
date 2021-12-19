import Link from 'next/link'
import React, { useContext } from 'react';
import { FirebaseContext } from '../../firebase/context';

import styles from "../../styles/Navegacion.module.css"

export const Navegacion = () => {

    const { usuario } = useContext( FirebaseContext )

    return (
        <>
            <nav className={ styles.navegacion }>
                <Link href="/">Inicio</Link>
                <Link href="/populares">Populares</Link>
                {
                    usuario &&
                    <Link href="/nuevo-producto">Nuevo Producto</Link>
                }
            </nav>
        </>
    )
}
