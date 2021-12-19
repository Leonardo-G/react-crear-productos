import React from 'react'
import { Layout } from '../components/layout/Layout'

const NuevoProducto = () => {
    return (
        <div>
            <Layout>
                <h1 className={ styles.titulo_formulario }>Nuevo Producto</h1>
                <form 
                    className={ styles.formulario } 
                    onSubmit={ handleSubmit }
                    noValidate
                >
                    <div className={ styles.campo }>
                        <label htmlFor='nombre' className={ styles.campo_label }>Nombre</label>
                        <input 
                            className={ styles.campo_input }
                            type="text"
                            id="nombre"
                            placeholder='Tu Nombre'
                            name='nombre'
                            value={nombre}
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        />
                    </div>
                    {
                        errores.nombre && <p className={ styles.errores }>{ errores.nombre }</p>
                    }
                    {
                        error !== "" && <p className={ styles.errores }>{ error }</p>
                    }
                    <input 
                        className='boton boton--orange block'
                        type="submit"
                        value="Crear Cuenta"
                    />
                </form>
            </Layout>
        </div>
    )
}

export default NuevoProducto