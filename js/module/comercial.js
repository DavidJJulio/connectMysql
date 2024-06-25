import {connection} from "../connection.js";

//5. Devuelve un listado con el nombre y los apellidos de los comerciales que tienen una comisión entre 0.05 y 0.11.

export const getComercialesByComision = async() =>{
    let [result]=await connection.query('select nombre, apellido1, apellido2 from comercial where comision > 0.05 and comision < 0.11;');
    return result;
}

//6. Devuelve el valor de la comisión de mayor valor que existe en la tabla `comercial`.

export const getBiggestComision = async() =>{
    let [result]=await connection.query('select comision from comercial order by comision desc limit 1;');
    return result;
}