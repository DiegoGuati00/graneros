import React, { useEffect, useState } from 'react';
import Graneros from '../../../indexDB/Graneros';

const FormLogin = () => {
    const [data, setData] = useState({
        usuario:"",
        contraseña:""
    });

    const changeData = (text,name)=>{
        data[name] = text;
        setData(data);
    }
    const almacen = new Graneros();

    const seend = (e)=>{
        e.preventDefault();
        const usuarios = almacen.get("usuarios",check);
        // window.location.reload();
    }

    const check = (vals)=>{
        console.log(vals);
        vals.map((v)=>{
            if(v.usuario == data.usuario){
                console.log(v);
                if(v.contraseña == data.contraseña){
                    sessionStorage.setItem("session", true);
                    window.location.replace("/dashboard")
                }else{
                    alert("usuario invelido")
                }
            }else{
                alert("usuario invelido")

            }
            
        })
        // window.location.reload();
    }
    useEffect(() => {
        let co = sessionStorage.getItem("session");
        if(co){
            window.location.replace("/dashboard")
        }
    }, []);

    return (
        <div className="q2">
            <div className="divprin">
                <div className="PRIN1">
                    <form onSubmit={seend}>
                        <h1>LOGIN</h1>
                        <label htmlFor="nombreC">NOMBRE</label>
                        <input type="text"  onChange={(e)=>changeData(e.target.value,"usuario")} id="nombreC" placeholder="INGRESE USUARIO" />

                        <label htmlFor="CCcedula">Contraseña</label>
                        <input type="password" onChange={(e)=>changeData(e.target.value,"contraseña")} id="CCcedula" placeholder="INGRESE CONTRASEÑA" />

                        <input type="submit" value="enviar" />
                    </form>
                </div>
            </div>

        </div>
    );
}

export default FormLogin;
