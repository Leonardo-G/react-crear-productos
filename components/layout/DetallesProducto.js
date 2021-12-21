import React from 'react';
import styles from "../../styles/DetallesProducto.module.css";
import imgComentario from "../../public/img/comentario.png"
import Image from 'next/image';

export const DetallesProducto = ({ id, comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos }) => {
    
    
    
    return (
        <li className={ styles.producto }>
            <div className={ styles.descripcion }>
                <div>
                    {
                        urlImagen &&
                        <img className={ styles.imagen } src={ urlImagen } alt={ nombre }/>
                    }
                </div>
                <div>
                    <h1>{ nombre }</h1>
                    <p>{ descripcion }</p>
                    <div className={ styles.descripcion_comentarios }>
                        <div>
                            <Image width={20} height={20} src={ imgComentario } alt='comentarios'/>
                            <p>{ comentarios.length } Comentarios</p>
                        </div>
                    </div>
                    {
                        ( new Date().getDay() - new Date(Number(creado)).getDay() ) == 0
                        ?   <p>Creado hace: { new Date().getHours() - new Date(Number(creado)).getHours() } Horas</p>
                        :   <p>Creado hace: { new Date().getDay() - new Date(Number(creado)).getDay() } Dias</p>
                    }
                </div>
            </div>
            <div className={ styles.votos }>
                <div>&#9650;</div>
                <p>{ votos }</p>
            </div>
        </li>
    )
}
