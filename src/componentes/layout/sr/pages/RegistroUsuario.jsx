import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const RegistroUsuario = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erros, setErros] = useState([]);

    const seend = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://api.escuelajs.co/api/v1/users/',
            data: {
                name,
                email,
                password,
                avatar: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg"
            }
        }).then((response)=>{
            if(response.status == 201){
                Swal.fire({
                    icon: "success",
                    title: "creado con exito"
                });
                setName("");
                setEmail("");
                setPassword("");
            }
        }).catch(err=>{
            setErros(err.response.data.message)
            setTimeout(() => {
                setErros([])
            }, 5000);
        })
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
        if(cookiesLogin.access_token && cookiesLogin.refresh_token){
            window.location.replace("/")
        }
        Swal.fire({
            icon: "warning",
            title: "sitio inseguro",
            text: "este sitio no proteje tu informacion no ingreses credenciales reales",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
    }, []);
    return (
        <div className="q2">
            <div className="divprin">
                <div className="PRIN1">
                    <form onSubmit={seend}>
                        <h1>Crear Cuenta</h1>
                    {
                        erros.map(err=>{
                            return <p className='err'>{err}</p>
                        })
                    }
                        <label htmlFor="nombreN">NOMBRE</label>
                        <input type="text" onChange={(e)=>setName(e.target.value)} value={name} id="nombreN" placeholder="INGRESE NOMBRE" />

                        <label htmlFor="nombreC">EMAIL</label>
                        <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} id="nombreC" placeholder="INGRESE CORREO" />

                        <label htmlFor="CCcedula">CONTRASEÑA</label>
                        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} id="CCcedula" placeholder="INGRESE CONTRASEÑA" />

                        <input type="submit" value="enviar" />
                    </form>
                </div>
            </div>

        </div>
    );
}

export default RegistroUsuario;
