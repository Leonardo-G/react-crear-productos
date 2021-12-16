import Link from 'next/link'
import React from 'react'

export const Header = () => {
    return (
        <header>
            <h1>Desde el Header</h1>
            <nav>
                <Link href="/">Inicio</Link>
                <Link href="/nosotros">Nosotros</Link>
            </nav>
        </header>
    )
}
