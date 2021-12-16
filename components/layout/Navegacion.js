import Link from 'next/link'
import React from 'react'

export const Navegacion = () => {
    return (
        <nav>
            <Link href="/">Inicio</Link>
            <Link href="/nosotros">Populares</Link>
            <Link href="/nosotros">Nuevo Producto</Link>
        </nav>
    )
}
