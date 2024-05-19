import home from "./home";
import login from "./login";
import productos from "./productos";

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
        productos,
        login
    ]



}
export default app;