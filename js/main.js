import { 
    getAllProductsDescription,
    getEmployeesByOffice,
    getOrdersbyStatus,
    getAllOrderdetailsByCustomers,
    getCreditLimitOverCertainQuantity,
    getProductsWithDescriptions,
    getDetailsOfEmployeeByBoss,
    getOrdersByClientsFromFrance,
    getTotalPaymentsByClients,
    getOrderDetailsAndProductsByClientCode,
    getAverageCreditLimitOfAllClients,
    getTotalStock,
    getAverageBuyPrice,
    getOfficesQuantityByCountry,
    getTotalPayments,
    getTotalEmployees,
    getAverageProductsInOrders,
    getTotalOfAllProducts,
    getAverageMSRP,
    getTotalEmployeesByJobTitle,
} from "./consultations.js";

console.log(await getTotalEmployeesByJobTitle())