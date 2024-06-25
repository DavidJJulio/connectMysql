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