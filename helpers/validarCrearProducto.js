export const validarCrearProducto = (valores) => {
    let errores = {};

    //Validar el nombre del usuario
    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio";
    }

    //Validar empresa
    if(!valores.empresa){
        errores.empresa = "El nombre de la empresa es Obligatorio";
    }

    if(!valores.url){
        errores.url = "La URL del producto es obligatorio"
    }else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ){
        errores.url = "URL no válida";
    } 

    if(!valores.descripcion){
        errores.descripcion = "Agrega una descripcion de tu producot"
    }

    return errores
}