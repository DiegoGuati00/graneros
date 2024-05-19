import React, { useContext, useEffect, useState } from 'react';
import  NavLink  from '../../Api-Contents/contex/hooks/NavLink';
import ImgContex from '../../contex/ImgContex';
import { useLocation } from 'react-router-dom';

const MenuComp = ({menu=[]}) => {
    const [esconde, setEsconde] = useState(true);
    const IMGprovider = useContext(ImgContex);
    const [menuStyles, setMenuStyles] = useState({});
    const [localCurrent, setLocalCurrent] = useState(null);
    const locacion = useLocation();
    
    useEffect(() => {
        window.addEventListener('scroll',function(e){
            // console.log(e);
            // console.log(window.scrollY);
            if(window.scrollY > 100){
                setMenuStyles({
                    background:'white'
                })
            }else{
                setMenuStyles({})
            }

        })
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
        <div id='menu-public'>
            <div style={menuStyles} className='MenuP-menu'>
                <div className="MenuP-logo">
                    <NavLink
                        to={'/'}
                        children={<img src={IMGprovider['mainLogo']} alt="" />}
                    />
                    
                </div>

                <div className='MenuP-hamburguesa' onClick={menuEsconde}>
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path className="hidden" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className={'MenuP-nav '+(esconde ? 'MenuP-esconde' : '')}>
                    <BtnsMenuComp 
                    action={menuEsconde}
                        btns ={menu
                        //     [
                        //     [
                        //         ['Nosotros','quienes-somos'],[
                        //             ['¿Quiénes somos?','quienes-somos'],
                        //             ['Nuestro proceso de gestión','nuestra-cadena-de-valor'],
                        //             ['ESAL','esal']
                        //         ]
                        //     ],
                        //     [
                        //         ['Entregue sus llantas','que-llantas-recibimos'],[
                        //             ['¿Qué llantas recibimos?','que-llantas-recibimos'],
                        //             ['Residencial','residencial'],
                        //             ['Institucional','institucional'],
                        //             ['Ruta Selectiva','ruta-selectiva'],
                        //             ['Jornadas de recolección','jornadas-de-recoleccion'],
                        //             ['Certificado','certificado']
                        //         ]
                        //     ],
                        //     [['Soy un importador','soy-importador']],
                        //     [
                        //         ['Así gestionamos las llantas','aprovechamiento-y-valorizacion'],[
                        //             ['Aprovechamiento y valorización','aprovechamiento-y-valorizacion'],
                        //             ['Reencauche técnico','reencauche-tecnico']
                        //         ]
                        //     ],
                        //     [['Noticias','noticias']],
                        //     [['Plataforma']],
                        //     [['Contáctenos','contactenos']]
                        // ]
                    }
                        Myclass='MenuP-Content' 
                    />
                </div>
            </div>
        </div>
    );
};


// MenuComp.propTypes = {

// };

const BtnMenuComp = ({titulo,logo,sub,goAccion}) => {
    const Menu = document.querySelector('#menu-public');
    let location = useLocation();

    const isActive = ()=>{
        if(location.pathname == ('/'+titulo[1])){
            return true;
        }
        if(sub){
            let have = false;
            sub.forEach(element => {
                if(location.pathname == ('/'+element[1])){
                    have = true
                }
            });
            return have;
        }
        return false;
    }

    useEffect(() => {
        if(isActive()){
            if(!activeSelect){
                setActiveSelect(true)
            }
        }else{
            if(activeSelect){
                setActiveSelect(false)
            }
        }
        // console.log(sub)
        // console.log(location)
        // console.log(titulo[1])
        // console.log(isActive)
    }, [location]);
    
    // const MenuItems = Menu.children[0];
    // const MenuItems = Menu.children[0].childNodes[2].childNodes[0].children;
    const [active, setActive] = useState(true);
    const [activeSelect, setActiveSelect] = useState(true);
    const IMGprovider = useContext(ImgContex);

    const menu = ()=>{
        if(active){
            setActive(false)
        }else{
            setActive(true)
        }
        if(!logo){
            pru()
        }
    }

    const up = ()=>{
        // pru()
        if(active){
            setActive(false)
            // console.log('hola')
        }
    }

    const down = ()=>{
        if(!active){
            setActive(true)
        }
    }
    
    const pru = ()=>{
        goAccion()
        // console.log(active)
    }

    const prus = (e)=>{
        // console.log(e)
        // console.log('aqui')
    }

   


    return (
        <div className='MenuP-BtnNavContenedor' 
            onClick={menu}
            onMouseOver={up}
            onMouseLeave={down}
        >
            {
                titulo.length == 3 ?
                <a href={titulo[2] ? titulo[2] : '#'} target='_blank' rel='noopener noreferrer' className='MenuP-BtnNav'>
                    <div >
                            <p >{titulo[0]}</p>
                        </div>
                        {
                            logo ? 
                            <div className='MenuP-icoBtn'>
                                <img src={IMGprovider['downMenu']} alt="" />
                            </div>:
                            <div className='MenuP-icoBtn MenuP-MenuNoVisible' >
                                <img src={IMGprovider['downMenu']} alt="" />
                            </div>
                        }
                </a>
                :
                <NavLink
                Myclass={'MenuP-BtnNav'+(activeSelect ? ' selec-MenuP-BtnNav': '')}
                to={titulo[1] ? titulo[1] : '#'}
                children={
                    <>
                        <div >
                            <p >{titulo[0]}</p>
                        </div>
                        {
                            logo ? 
                            <div className='MenuP-icoBtn'>
                                <img src={IMGprovider['downMenu']} alt="" />
                            </div>:
                            <div className='MenuP-icoBtn MenuP-MenuNoVisible' >
                                <img src={IMGprovider['downMenu']} alt="" />
                            </div>
                        }
                    </>
                }
                />
            }
            {
                sub ?
                <div className={active ? 'MenuP-MenuHidden':'MenuP-MenuVisible' + " MenuP-subContentBtnNav"}>
                    {
                        sub.map((v,i)=> {
                            // console.log(v.length)
                            switch (v.length) {
                                case 3:
                                    return <a href={v[2]?v[2]:'#'} target='_blank' rel='noopener noreferrer'>
                                        <div onClick={pru} className='MenuP-subBtnNav' key={i}>
                                                <p>{v[0]}</p>
                                        </div>
                                        <hr/>
                                    </a>
                                    break;
                            
                                default:
                                    return <NavLink
                                    key={i}
                                    to={v[1]?v[1]:'#'}
                                    children={
                                        <>
                                            <div onClick={pru} className='MenuP-subBtnNav' key={i}>
                                                <p>{v[0]}</p>
                                            </div>
                                            <hr/>
                                        </>
                                    }
                                    />
                                    break;
                            }
                            
                        }
                        )
                    }
                </div>:''
                }
        </div>
    );
}

const BtnsMenuComp = ({btns=[], Myclass=null,action=null}) => {
    return (
        <div className={Myclass}>
            {
                btns.map((v,i)=>{
                    // console.log(v)
                    return <BtnMenuComp
                        titulo={v[0]}
                        logo={v[1] && v[1].length >= 1? true:false}
                        key={i}
                        sub={v[1] && v[1].length >= 1? v[1]:false}
                        goAccion={action}
                    />
                })
            }
        </div>
    );
}



export default MenuComp;
