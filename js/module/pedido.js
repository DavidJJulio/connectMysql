import {connection} from "../connection.js";

//1. Devuelve un listado con todos los pedidos que se han realizado. 
//Los pedidos deben estar ordenados por la fecha de realización, mostrando en primer lugar los pedidos más recientes.

export const getAllOrders = async() =>{
    let [result]=await connection.query('select * from pedido order by fecha desc;');
    return result;
}

//2. Devuelve todos los datos de los dos pedidos de mayor valor

export const getBiggestPrice = async() =>{
    let [result]=await connection.query('select * from pedido order by total desc limit 2;');
    return result;
}

//3. Devuelve un listado con los identificadores de los clientes que han realizado algún pedido. 
//Tenga en cuenta que no debe mostrar identificadores que estén repetidos.

export const getIdCLientsWithoutRequests = async() =>{
    let [result]=await connection.query('select distinct id_cliente from pedido;');
    return result;
}

//4. Devuelve un listado de todos los pedidos que se realizaron durante el año 2017, cuya cantidad total sea superior a 500€.

export const getRequestsFrom2017 = async() =>{
    let [result]=await connection.query('select * from pedido where year(fecha) = 2017 and total > 500;');
    return result;
}

//1. Calcula la cantidad total que suman todos los pedidos que aparecen en la tabla `pedido`.

export const getSum = async() =>{
    let [result]=await connection.query('select sum(total) as Total from pedido;');
    return result;
}

//2. Calcula la cantidad media de todos los pedidos que aparecen en la tabla `pedido`.

export const getAVG = async() =>{
    let [result]=await connection.query('select avg(total) as promedio from pedido;');
    return result;
}

//3. Calcula el número total de comerciales distintos que aparecen en la tabla `pedido`.

export const getComercial = async() =>{
    let [result]=await connection.query(`SELECT COUNT(DISTINCT id_comercial) AS 'total_comerciales' FROM pedido;`);
    return result;
}

//5. Calcula cuál es la mayor cantidad que aparece en la tabla `pedido`.

export const getBiggest = async() =>{
    let [result]=await connection.query(`SELECT MAX(total) FROM pedido;`);
    return result;
}

//6. Calcula cuál es la menor cantidad que aparece en la tabla `pedido`.

export const getSmallest = async() =>{
    let [result]=await connection.query(`SELECT MIN(total) FROM pedido;`);
    return result;
}

//9. Calcula cuál es el máximo valor de los pedidos realizados durante el mismo día para cada uno de los clientes, 
//teniendo en cuenta que sólo queremos mostrar aquellos pedidos que superen la cantidad de 2000 €.

export const getPriceMaxByQuantity = async() =>{
    let [result]=await connection.query(`
    SELECT p.*
    FROM pedido p
    INNER JOIN (
        SELECT id_cliente, fecha, MAX(total) AS max_total
        FROM pedido
        WHERE total > 2000
        GROUP BY id_cliente, fecha
    ) po ON p.id_cliente = po.id_cliente AND p.fecha = po.fecha AND p.total = po.max_total;`);
    return result;
}

//10. Calcula el máximo valor de los pedidos realizados para cada uno de los 
//comerciales durante la fecha `2016-08-17`. Muestra el identificador del comercial, nombre, apellidos y total.

export const getMaxValueByYear = async() =>{
    let [result]=await connection.query(`
    SELECT p.id 'id_pedido'
    , c.id 'id_comercial', concat(c.nombre ,'  ', c.apellido1) 'Comercial', max(p.total) 'Max Value' From comercial  c INNER JOIN pedido p ON c.id= p.id_comercial WHERE fecha='2016-08-17' GROUP BY p.id , c.nombre , c.apellido1;
    `);
    return result;
}

//14. Devuelve cuál ha sido el pedido de máximo valor que se ha realizado cada año.

export const getBiggestByEachYear = async() =>{
    let [result]=await connection.query(`
    SELECT 
        pedidos.id,
        YEAR(pedidos.fecha) AS Año,
        pedidos.total AS 'Maximo Valor',
        pedidos.fecha AS 'Fecha Completa',
        pedidos.id_cliente AS 'ID Cliente',
        pedidos.id_comercial AS 'ID Comercial'
        FROM 
        pedido pedidos JOIN (
          SELECT
          YEAR(fecha) AS Año,
          max(total) AS Valor_Maximo
          FROM 
          pedido
          GROUP BY 
          año 
          ORDER BY 
          año) 
       AS max_ped_por_año 
       ON Año = max_ped_por_año.Año 
       AND pedidos.total = max_ped_por_año.Valor_Maximo;
    `);
    return result;
}

//15. Devuelve el número total de pedidos que se han realizado cada año.

export const getTotalByYear = async() =>{
    let [result]=await connection.query(`
    SELECT YEAR(fecha) AS año, COUNT(*) AS numero_pedido FROM pedido GROUP BY YEAR(fecha) ORDER BY año;
    `);
    return result;
}