import React, { useEffect } from 'react';
import Graneros from '../../../../indexDB/Graneros';
import { useState } from 'react';
import Nosotros from '../Nosotros';
import FormUsuario from '../FormUsuario';

const Home = ({config={}}) => {
    const {
        mision = "",
        vision
    } = config;
    const almacen = new Graneros();
    const [ver, setVer] = useState(true);
    const init = (a)=>{
        console.log(a)
        if(!a.length){
            setVer(false);
        }
    }
    useEffect(() => {
        const usuarios = almacen.get("usuarios",init);
        // const usuarios = almacen.new("usuarios",{clave:"as",nombre:"123456789"});
        // console.log(mision);
        // console.log(usuarios);
        // console.log(usuarios);
    }, []);
    return (
        <div>
            {
                ver ?
                    <Nosotros config={{
                        mision,
                        vision
                    }}/> 
                :
                    <FormUsuario/>
            }
            
        </div>
    );
}

export default Home;
