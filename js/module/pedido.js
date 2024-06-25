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
