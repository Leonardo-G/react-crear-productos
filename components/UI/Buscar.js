import React from 'react';
import searchImg from '../../public/img/buscar.png';
import Image from 'next/image'

import styles from "../../styles/Buscar.module.css";

export const Buscar = () => {
    return (
        <form className={ styles.relative }>
            <input 
                type="text"
                className={ styles.inputText }
                placeholder='Buscar Productos'
            />
            <span
                className={ styles.submit }  
            >
                <Image
                    src={ searchImg }
                    width={30}
                    height={30}
                    alt='img buscador'
                />
            </span>
        </form>
    )
}
