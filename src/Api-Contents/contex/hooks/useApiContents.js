import axios from 'axios';
import React, { useEffect, useState } from 'react';
//contents,composicion
const useApiContents = (config) => {
    const [configuracion, setConfiguracion] = useState({
        remote: config.remote ? config.remote : false,
        remotePath: config.remotePath ? config.remotePath : null,
        local: config.local ? config.local : null
    });
    const [finalConfig, setFinalConfig] = useState({});
    const search = async (url)=>{
        const data = await fetch(url).catch((err)=>{
            setLocal();
        })
        let datos = await  data.json();

        // console.log(datos)
        if(datos.tree && datos.pages){
            setFinalConfig(datos);
        }else{
            setLocal()
        }
    }
    const setLocal = ()=>{
        if(configuracion.local){
            // console.log(configuracion.local)
            setFinalConfig(configuracion.local)
        }
    }
    useEffect(() => {
        // console.log(finalConfig);
        if(configuracion.remote){
            search(configuracion.remote)
        }else{
            setLocal();
        }
    }, []);
    return[finalConfig]
}

export default useApiContents;
