import React, { useState } from 'react';
import Graneros from '../../../indexDB/Graneros';

const FormUsuario = () => {
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
        const usuarios = almacen.new("usuarios",data);
        window.location.reload();
        window.location.replace("/");
    }

    return (
        <div className="q2">
            <div className="divprin">
                <div className="PRIN1">
                    <form onSubmit={seend}>
                        <h1>Usuario Admin</h1>
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

export default FormUsuario;
