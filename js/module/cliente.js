import {connection} from "../connection.js";

//7. Devuelve el identificador, nombre y primer apellido de aquellos clientes cuyo segundo apellido 
//**no** es `NULL`. El listado deberá estar ordenado alfabéticamente por apellidos y nombre.

export const getIdBy2ndLastnameNotNull = async() =>{
    let [result]=await connection.query("select id, concat(nombre, ' ', apellido1) as nombre_completo from cliente where apellido2 is not null order by nombre asc, apellido1 asc, apellido2 asc;");
    return result;
}

//8. Devuelve un listado de los nombres de los clientes que empiezan por `A` y 
//terminan por `n` y también los nombres que empiezan por `P`. El listado deberá estar ordenado alfabéticamente.

export const getClientsStartsWithA = async() =>{
    let [result]=await connection.query("select nombre from cliente where nombre like '%n' and nombre like 'a%' or nombre like 'p%' order by nombre asc;");
    return result;
}

//9. Devuelve un listado de los nombres de los clientes que **no** empiezan por `A`. El listado deberá estar ordenado alfabéticamente.

export const getClientsNotStartsWithA = async() =>{
    let [result]=await connection.query("SELECT nombre FROM cliente WHERE nombre NOT LIKE 'A%'ORDER BY nombre;");
    return result;
}

