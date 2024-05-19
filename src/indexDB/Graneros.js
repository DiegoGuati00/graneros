import DB from"./DB.js";

class Graneros extends DB{
    constructor(){
        super("graneros",[
            "clientes",
            "proveedores",
            "productos",
            "categorias",
            "usuarios"
        ]);
        // this.setDBs("graneros");
    }
    

}

export default Graneros;