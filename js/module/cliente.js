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

//1. Devuelve un listado con el identificador, nombre y los apellidos de todos los clientes que han realizado algún pedido. 
//El listado debe estar ordenado alfabéticamente y se deben eliminar los elementos repetidos.
export const getClientsHaveDoneRequests = async() =>{
    let [result]=await connection.query("select distinct c.id, c.nombre, c.apellido1, c.apellido2 from cliente c inner join pedido p on p.id_cliente = c.id");
    return result;
}

//2. Devuelve un listado que muestre todos los pedidos que ha realizado cada cliente. El resultado debe mostrar todos los datos de los pedidos y del cliente. 
//El listado debe mostrar los datos de los clientes ordenados alfabéticamente.

export const getRequestsFromClients = async() =>{
    let [result]=await connection.query(`
    select  c.id, c.nombre, c.apellido1, c.apellido2, c.ciudad, c.categoria, p.id, p.total, p.fecha, p.id_cliente, p.id_comercial 
    from cliente c
    inner join pedido p on c.id = p.id_cliente
    order by c.nombre asc, c.apellido1 asc;`);
    return result;
}

//4. Devuelve un listado que muestre todos los clientes, con todos los pedidos que han realizado y con los datos de los comerciales asociados a cada pedido.

export const getAllFromClients = async() =>{
    let [result]=await connection.query(`SELECT c.id AS cliente_id, p.id AS pedido_id, co.id AS comercial_id, co.nombre, co.apellido1 FROM cliente AS c INNER JOIN pedido AS p ON c.id = p.id_cliente INNER JOIN comercial AS co ON p.id_comercial = co.id ORDER BY c.id;`);
    return result;
}

//5. Devuelve un listado de todos los clientes que realizaron un pedido durante el año `2017`, cuya cantidad esté entre `300` € y `1000` €.

export const getClientsByYearAndPayment = async() =>{
    let [result]=await connection.query(`
    SELECT co.apellido1, co.nombre, co.apellido2
    FROM comercial co
    INNER JOIN pedido p ON p.id_comercial = co.id
    INNER JOIN cliente cl ON cl.id = p.id_cliente
    WHERE
    concat(cl.nombre, ' ',cl.apellido1, ' ',cl.apellido2) = 'Maria Santana Moreno';`);
    return result;
}

//7. Devuelve el nombre de todos los clientes que han realizado algún pedido con el comercial `Daniel Sáez Vega`.

export const getClientsByComercial = async() =>{
    let [result]=await connection.query(`
    select distinct c.nombre from cliente c inner join pedido p on p.id_cliente = c.id where p.id_comercial = (select id from comercial where concat(nombre, ' ', apellido1, ' ', apellido2) = 'Daniel Sáez Vega');`);
    return result;
}

//1. Devuelve un listado con **todos los clientes** junto con los datos de los pedidos que han realizado. Este listado también debe incluir los clientes que no han realizado ningún pedido. 
//El listado debe estar ordenado alfabéticamente por el primer apellido, segundo apellido y nombre de los clientes.

export const getAllClients = async() =>{
    let [result]=await connection.query(`
    select distinct c.id, c.nombre, c.apellido1, c.apellido2, p.* from cliente c left join pedido p on c.id = p.id_cliente;
    `);
    return result;
}

//3. Devuelve un listado que solamente muestre los clientes que no han realizado ningún pedido.

export const getClientsWithoutPayments = async() =>{
    let [result]=await connection.query(`
    select c.* from cliente c left join pedido p on c.id = p.id_cliente where p.id_cliente is null;
    `);
    return result;
}

//5. Devuelve un listado con los clientes que no han realizado ningún pedido y de los comerciales que no han participado en ningún pedido. Ordene el listado 
//alfabéticamente por los apellidos y el nombre. En en listado deberá diferenciar de algún modo los clientes y los comerciales.

export const getClientsWithoutRequests = async() =>{
    let [result]=await connection.query(`
    # German
    `);
    return result;
}

//4. Calcula el número total de clientes que aparecen en la tabla `cliente`.

export const getCountClients = async() =>{
    let [result]=await connection.query(`
    select count(*) from cliente;
    `);
    return result;
}

//7. Calcula cuál es el valor máximo de categoría para cada una de las ciudades que aparece en la tabla `cliente`.

export const getMaxValue = async() =>{
    let [result]=await connection.query(`select distinct(ciudad), max(categoria) from cliente group by ciudad;`);
    return result;
}

//8. Calcula cuál es el máximo valor de los pedidos realizados durante el mismo día para cada uno de los clientes. 
//Es decir, el mismo cliente puede haber realizado varios pedidos de diferentes cantidades el mismo día. 
//Se pide que se calcule cuál es el pedido de máximo valor para cada uno de los días en los que un 
//cliente ha realizado un pedido. Muestra el identificador del cliente, nombre, apellidos, la fecha y el valor de la cantidad.

export const getMaxRequestsByClient = async() =>{
    let [result]=await connection.query(`
    SELECT t1.id, t1.nombre, t1.apellido1, MAX(t2.total),     t2.fecha 
    FROM cliente t1, pedido t2 
    WHERE t2.id_cliente = t1.id GROUP BY t2.fecha, t1.id ORDER BY t2.fecha;`);
    return result;
}

//11. Devuelve un listado con el identificador de cliente, nombre y apellidos y el número total de pedidos que ha realizado cada uno de clientes. 
//Tenga en cuenta que pueden existir clientes que no han realizado ningún pedido. 
//Estos clientes también deben aparecer en el listado indicando que el número de pedidos realizados es `0`.

export const getIdByNumberOfRequests = async() =>{
    let [result]=await connection.query(`
    SELECT cliente.id, cliente.apellido1, cliente.apellido2, COUNT(pedido.id)
    FROM cliente
    LEFT JOIN pedido ON cliente.id=pedido.id_cliente
    GROUP BY cliente.id;
    `);
    return result;
}


//12. Devuelve un listado con el identificador de cliente, nombre y apellidos 
//y el número total de pedidos que ha realizado cada uno de clientes **durante el año 2017**.

export const getClientByYear = async() =>{
    let [result]=await connection.query(`
    select cliente.id, cliente.nombre, cliente.apellido1, cliente.apellido2, count(pedido.id) as cantidad2017 from cliente inner join pedido on pedido.id_cliente = cliente.id where year(pedido.fecha) = 2017 group by cliente.id;
    `);
    return result;
}

//13. Devuelve un listado que muestre el identificador de cliente, nombre, primer apellido y el valor de la máxima cantidad del pedido realizado por cada uno de los clientes. 
//El resultado debe mostrar aquellos clientes que no han realizado ningún pedido indicando que la máxima cantidad de sus pedidos realizados es `0`. Puede hacer uso de la función [`IFNULL`](https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#function_ifnull).

export const getCLientByNoRequests = async() =>{
    let [result]=await connection.query(`
    SELECT C.id, C.nombre, C.apellido1, IFNULL(max(P.total), 0) AS 'Cantidad maxima'
    FROM cliente AS C
    LEFT JOIN pedido as P
    ON C.id = P.id_cliente
    GROUP BY C.id;
    `);
    return result;
}
