import { 
    getAllOrders,
    getBiggestPrice
} from "./module/pedido.js";

import { 
    getIdBy2ndLastnameNotNull,
} from "./module/cliente.js";

console.log(await getIdBy2ndLastnameNotNull())