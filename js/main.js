import { 
    getAllOrders,
    getBiggestPrice,
    getIdCLientsWithoutRequests,
    getRequestsFrom2017,
    getSum,
    getAVG,
    getComercial,
    getBiggest,
    getSmallest,
    getPriceMaxByQuantity,
    getMaxValueByYear,
    getBiggestByEachYear,
    getTotalByYear
} from "./module/pedido.js";

import { 
    getIdBy2ndLastnameNotNull,
    getClientsStartsWithA,
    getClientsNotStartsWithA,
    getClientsHaveDoneRequests,
    getRequestsFromClients,
    getAllFromClients,
    getClientsByYearAndPayment,
    getClientsByComercial,
    getAllClients,
    getClientsWithoutPayments,
    getClientsWithoutRequests,
    getCountClients,
    getMaxValue,
    getMaxRequestsByClient,
    getIdByNumberOfRequests,
    getClientByYear,
    getCLientByNoRequests,
    getByMethod,

} from "./module/cliente.js";

import {
    getComercialesByComision,
    getBiggestComision,
    getComercialEndsWithEl,
    getRequestsFromComercial,
    getComercialByClient,
    getAllComercial,
    getComercialWithoutRequests,
    getComercialByMethod,
} from "./module/comercial.js"

console.log(await getIdBy2ndLastnameNotNull())