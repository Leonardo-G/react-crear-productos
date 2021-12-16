import Link from 'next/link'
import React from 'react'
import { Buscar } from '../UI/Buscar'
import { Navegacion } from './Navegacion'

export const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>
                    <Buscar />
                    <Navegacion />
                </div>
            </div>
            <div>
                <p>Hola: Leonardo</p>
                <button
                    type='button'
                >Cerrar Sesión</button>
                <Link href="/">Login</Link>
                <Link href="/">Crear Cuenta</Link>
            </div>
            
        </header>
    )
}
