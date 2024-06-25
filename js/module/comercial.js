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

//10. Devuelve un listado con los nombres de los comerciales que terminan por `el` o `o`. Tenga en cuenta que se deberán eliminar los nombres repetidos.

export const getComercialEndsWithEl = async() =>{
    let [result]=await connection.query("SELECT DISTINCT nombre FROM comercial WHERE LOWER(RIGHT(nombre, 2)) = 'el' OR LOWER(RIGHT(nombre, 1)) = 'o';");
    return result;
}

//3. Devuelve un listado que muestre todos los pedidos en los que ha participado un comercial. El resultado debe mostrar todos los datos de los pedidos y de los comerciales. 
//El listado debe mostrar los datos de los comerciales ordenados alfabéticamente.

export const getRequestsFromComercial = async() =>{
    let [result]=await connection.query(`SELECT p.id, p.total, p.fecha, p.id_cliente, p.id_comercial, cl.nombre, cl.apellido1, cl.apellido2, cl.comision FROM pedido AS p INNER JOIN comercial AS cl ON cl.id = p.id_comercial ORDER BY nombre;`);
    return result;
}

//6. Devuelve el nombre y los apellidos de todos los comerciales que ha participado en algún pedido realizado por `María Santana Moreno`.

export const getComercialByClient = async() =>{
    let [result]=await connection.query(`SELECT p.id, p.total, p.fecha, p.id_cliente, p.id_comercial, cl.nombre, cl.apellido1, cl.apellido2, cl.comision FROM pedido AS p INNER JOIN comercial AS cl ON cl.id = p.id_comercial ORDER BY nombre;`);
    return result;
}