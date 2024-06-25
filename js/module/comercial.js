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

//2. Devuelve un listado con **todos los comerciales** junto con los datos de los pedidos que han realizado. Este listado también debe incluir los comerciales que no han realizado ningún pedido. 
//El listado debe estar ordenado alfabéticamente por el primer apellido, segundo apellido y nombre de los comerciales.

export const getAllComercial = async() =>{
    let [result]=await connection.query(`
   SELECT co.id, concat(co.apellido1, " " ,co.apellido2, " ", co.nombre) as namefull, pe.total, pe.fecha, pe.id_cliente 
   FROM comercial co
   left JOIN pedido pe ON pe.id_comercial = co.id 
   ORDER BY namefull LIKE 'A%' ASC , namefull;
    `);
    return result;
}

//4. Devuelve un listado que solamente muestre los comerciales que no han realizado ningún pedido.

export const getComercialWithoutRequests = async() =>{
    let [result]=await connection.query(`
    SELECT DISTINCT c.id,c.nombre, CONCAT(c.apellido1,' ',c.apellido2) AS apellido FROM comercial AS c LEFT JOIN pedido AS p ON c.id=p.id_comercial WHERE p.id_comercial IS NULL GROUP BY c.id;
    `);
    return result;
}