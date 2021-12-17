import Link from 'next/link'
import React from 'react';

import styles from "../../styles/Navegacion.module.css"

export const Navegacion = () => {
    return (
        <>
            <nav className={ styles.navegacion }>
                <Link href="/">Inicio</Link>
                <Link href="/populares">Populares</Link>
                <Link href="/nuevo-producto">Nuevo Producto</Link>
            </nav>
        </>
    )
}
