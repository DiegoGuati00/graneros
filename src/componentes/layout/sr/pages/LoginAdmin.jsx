import React, { useContext, useEffect, useState } from 'react';
import Graneros from '../../../../indexDB/Graneros';
import AuthContex from '../../../../contex/AuthContex';

const LoginAdmin = () => {
    const {authAdmin, setAuthAdmin} = useContext(AuthContex);
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
        const usuarios = almacen.get("usuarios",(a)=>{
            console.log(a)
            a.map(b=>{
                if(b.usuario == data.usuario){
                    if(b.contraseña == data.contraseña){
                        setAuthAdmin(b)
                        document.cookie = "admin_access_token="+b.id+"; path=/";
                    }
                }
            })
        });
        window.location.reload();
        // window.location.replace("/");
    }

    useEffect(() => {
        let co = document.cookie;
        let ListCo=co.split(";");
        let cookiesLogin = {}
        ListCo.map(c=>{
            let a = c.replace(" ", "");
            
            a = a.split("=")
            cookiesLogin[a[0]] = a[1]?a[1]:a[0];
        })
        if(cookiesLogin.admin_access_token){
            almacen.get("usuarios",(a)=>{
                setAuthAdmin(a)
                window.location.replace("/dashboard")
            },parseInt(cookiesLogin.admin_access_token))
            console.log(cookiesLogin)
        }
        return () => {
            
        };
    }, []);
    return (
        <div className="q2">
        <div className="divprin">
            <div className="PRIN1">
                <form onSubmit={seend}>
                    <h1>Login Admin</h1>
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

export default LoginAdmin;
