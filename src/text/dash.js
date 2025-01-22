import clientes from "./clientes";
import logout from "./logout";
import home from "./home";
import proveedor from "./proveedor";
import dashProductos from "./dashProductos";
import dashboard from "./dashboard";
import LoginAdmin from "./loginAdmin";
import registroAdmin from "./registroAdmin";

// import AprovechamientoYvalorizacion from './aprovechamientoYvalorizacion';
const app = {
    // de donde toma los archivos por defecto
    // API // LOCAL
    // dataDefault: 'LOCAL',

// este proyecto puede buscar los texto de algun lado o tomar directamente textos preconfigurados
// tipo de dato: booleano
    // here: true,
    tree:{
        tree:   [
            // [["home","/dashboard"]],
            // [["clientes","/dashboard/clientes"]],
            // [["proveedor","/dashboard/proveedor"]],
            [["productos","/dashboard/dashProductos"]],
            [["logout","/dashboard/logout"]],
        ],
        footer:{
            titulo:"",
        }
    },

    
    pages:[
        dashboard,
        LoginAdmin,
        registroAdmin,
        // logout,
        // clientes,
        // proveedor,
        dashProductos
    ]



}
export default app;