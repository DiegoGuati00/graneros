import DB from"./DB.js";

class Graneros extends DB{
    constructor(){
        super("graneros",[
            "carrito",
            "compra",
            "favoritos",
            "usuarios"
        ]);
        // this.setDBs("graneros");
    }
    

}

export default Graneros;