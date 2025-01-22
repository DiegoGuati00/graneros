import home from "./home";
import registroAdmin from "./registroAdmin";
import registroUsuario from "./registroUsuario";
import login from "./login";
import productos from "./productos";
import producto from "./producto";
import carrito from "./carrito";
import comprar from "./comprar";
import compras from "./compras";

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
            [["home","/"]],
            [["registro","/registroAdmin"]],
            [["productos","/productos"]],
            [["login","/login"]],
        ],
        footer:{
            titulo:"",
            redes:{
                facebook:"https://www.facebook.com/",
                instagram:"https://www.instagram.com/",
                twitter:"https://twitter.com/",
                youtube:"https://www.youtube.com/"
            }
        }
    },

    
    pages:[
        home,
        registroUsuario,
        login,
        producto,
        carrito,
        comprar,
        compras
    ]



}
export default app;