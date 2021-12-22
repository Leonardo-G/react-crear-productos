import React, { useEffect, useState } from 'react';
import searchImg from '../../public/img/buscar.png';
import Image from 'next/image'

import styles from "../../styles/Buscar.module.css";
import { useRouter } from 'next/router';

export const Buscar = () => {

    const [busqueda, setBusqueda] = useState("");
    const router = useRouter();
    
    const handleBuscarProducto = () => {
        if(busqueda.trim() === "") return;
        router.push({
            pathname: "/buscar",
            query: {
                q: busqueda
            }
        })
    }

    return (
        <form className={ styles.relative }>
            <input 
                type="text"
                className={ styles.inputText }
                placeholder='Buscar Productos'
                onChange={ e => setBusqueda(e.target.value) }
            />
            <span
                className={ styles.submit }  
            >
                <Image
                    src={ searchImg }
                    width={30}
                    height={30}
                    alt='img buscador'
                    onClick={ handleBuscarProducto }
                />
            </span>
        </form>
    )
}
