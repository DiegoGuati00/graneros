import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AuthContex from '../../contex/AuthContex';
import Graneros from '../../indexDB/Graneros';
import FontAwesomeIcono from '../FontAwesomeIcono';
import axios from 'axios';

const MenuAdmin = () => {
    const navigate = useNavigate();
    const [esconde, setEsconde] = useState(true);
    const {authAdmin=null, setAuthAdmin} = useContext(AuthContex);
    const [menuStyles, setMenuStyles] = useState({});
    const [menuBuscador, setMenuBuscador] = useState(0);
    const [menuBuscadorSearch, setMenuBuscadorSearch] = useState([]);
    const [localCurrent, setLocalCurrent] = useState(null);
    const locacion = useLocation();
    const almacen = new Graneros();

    const changeResize = ()=>{
        // console.log(window.innerWidth);
        // console.log(window.innerWidth > 100);
        if(window.innerWidth > 600){
            setMenuBuscador(1);
        }else if(window.innerWidth < 600){
            setMenuBuscador(0);
        }

    }

    const searchProducto = (e)=>{
        if(e.target.value){
            axios({
                method: 'get',
                url: "https://api.escuelajs.co/api/v1/products",
              }).then((req)=>{
                const productos = [];
                req.data.map(p=>{
                    if(p.title.toLowerCase().includes(e.target.value.toLowerCase())){
                        productos.push(p);
                    }
                })
                setMenuBuscadorSearch(productos)
            })
        }else{
            setMenuBuscadorSearch([])
        }
    }


    
    useEffect(() => { // comprobar login
        let co = document.cookie;
        let ListCo=co.split(";");
        let cookiesLogin = {}
        ListCo.map(c=>{
            let a = c.replace(" ", "");
            
            a = a.split("=")
            cookiesLogin[a[0]] = a[1]?a[1]:a[0];
        })
        if(!cookiesLogin.admin_access_token){
            if(locacion.pathname == "/dashboard/registroAdmin"){

            }else if(locacion.pathname == "/dashboard/loginAdmin"){

            }else{
                window.location.replace("/dashboard/loginAdmin")
            }
        }
        // console.log(auth)
    });
    useEffect(() => {
        // const usuarios = almacen.get("usuarios",init);
        console.log(authAdmin)
        changeResize()
        window.addEventListener('resize',changeResize)
    }, []);
    useEffect(() => {
        if(!localCurrent){
            setLocalCurrent(locacion.pathname);
        }else{
            if(localCurrent != locacion.pathname){
                setLocalCurrent(locacion.pathname);
                // menuEsconde()
            }
        }
    }, [locacion]);
    const menuEsconde = ()=>{
        if(esconde){
            setEsconde(false)
        }else{
            setEsconde(true)
        }
    }
    const pru=()=>{
        console.log('prueba')
    }

    return (
        <div id='menu-comp'>
            <div style={menuStyles} className='MenuP-menu'>
                <div className='MenuP-P'>
                    <div className="MenuP-logo">
                        <NavLink
                            to={'/dashboard'}
                            children={<img src="https://fakeimg.pl/200x30/c55ed0?text=graneros mundial"/>}
                        />
                        
                    </div>

                    {
                        menuBuscador != 0 ? 
                            <div className='MenuP-buscador'>
                                <input type="" className='C1' onChange={searchProducto}/>
                                <div className='C2'>
                                    <FontAwesomeIcono iconName="faMagnifyingGlass"/> 
                                </div>
                                {
                                    menuBuscadorSearch.length != 0 ?
                                        <div className='C3'>
                                            <div className='C3-1'>
                                                {
                                                    menuBuscadorSearch.map((p,i)=>{
                                                        return <div onClick={()=>window.location.replace("/dashboard/producto/"+p.id)} key={"p"+i} className='C3-2'>
                                                            <p>{p.title}</p>
                                                        </div>

                                                    })
                                                }
                                            </div>
                                        </div>
                                    :null
                                }
                            </div>
                        :null
                    }

                    <div className="MenuP-iconos">
                        {
                            menuBuscador == 0 ?
                            <FontAwesomeIcono iconName="faMagnifyingGlass"/> 
                            :null
                        }
                        {/* <NavLink
                            to={'/'}
                            children={<FontAwesomeIcono iconName="faStar"/>}
                        /> */}
                        <NavLink
                            to={'/'}
                            children={<FontAwesomeIcono iconName="faCartShopping"/>}
                        />
                        {/* <NavLink
                            to={'/loginAdmin'}
                            children={<FontAwesomeIcono iconName="faUser"/>}
                        /> */}
                    </div>
                </div>
                <div className='MenuP-S'>
                    {
                        !authAdmin?
                        <div className='C1'>
                            <NavLink
                                to={'/dashboard/registroAdmin'}
                                children={
                                    <div className='M-btn'>
                                        <FontAwesomeIcono iconName="faUser"/>
                                        <p>Crear tu cuenta</p>
                                    </div>
                                }
                            />
                            <NavLink
                                to={'/dashboard/loginAdmin'}
                                children={
                                    <div className='M-btn'>
                                        <FontAwesomeIcono iconName="faRightToBracket"/>
                                        <p>Ingresar</p>
                                    </div>
                                }
                            />

                        </div>
                        :
                        <div className='C1'>
                            <div className='M-profile'>
                                <img src={authAdmin.usuario} alt="" />
                                <p>{authAdmin.usuario}</p>
                            </div>
                            <div className='M-btn' onClick={(e)=>{
                                document.cookie = "admin_access_token=; expires="+(new Date().toUTCString());
                                window.location.reload()
                            }}>
                                <FontAwesomeIcono iconName="faStore"/>
                                <p>Log out</p>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default MenuAdmin;
