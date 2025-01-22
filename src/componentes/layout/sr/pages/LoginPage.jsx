import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erros, setErros] = useState([]);

    const seend = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://api.escuelajs.co/api/v1/auth/login',
            data: {
                email,
                password
            }
        }).then((response)=>{
            console.log(response)
            if(response.status == 201){
                Swal.fire({
                    icon: "success",
                    title: "acceso correcto"
                });
                setEmail("");
                setPassword("");
                document.cookie = "access_token="+response.data.access_token;
                document.cookie = "refresh_token="+response.data.refresh_token;
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }
        }).catch(err=>{
            // console.log(err)
            if(err.response.status == 401){
                setErros([
                    "usuario o contraseña invalidos"
                ])
                setTimeout(() => {
                    setErros([])
                }, 5000);
            }
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
    }, []);

    return (
        <div className="q2">
            <div className="divprin">
                <div className="PRIN1">
                    <form onSubmit={seend}>
                        <h1>login</h1>
                    {
                        erros.map(err=>{
                            return <p className='err'>{err}</p>
                        })
                    }
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

export default LoginPage;
