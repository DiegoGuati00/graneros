import React, { Suspense, createContext, lazy } from 'react';
// import CarsEsal from '../componentes/CarsEsal';
//componentes
// const SliderComp =lazy(()=> import('./../componentes/Sliders/SliderComp'));
const FormCliente = lazy(()=> import('./../componentes/layout/sr/FormCliente'));
const FormProveedor = lazy(()=> import('./../componentes/layout/sr/FormProveedor'));
const Nosotros = lazy(()=> import('./../componentes/layout/sr/Nosotros'));
const FormLogin = lazy(()=> import('./../componentes/layout/sr/FormLogin'));
const Logout = lazy(()=> import('./../componentes/layout/sr/Logout'));

//pages
const Home = lazy(()=> import('./../componentes/layout/sr/pages/Home'));
const Productos = lazy(()=> import('./../componentes/layout/sr/pages/Productos'));
const DashProductos = lazy(()=> import('./../componentes/layout/sr/pages/DashProductos'));


const ComponentesContex = createContext();
const Cargando = ()=>{
    return(
        <div>
            <h2> cargando... </h2>
        </div>
    )
}
const ComponentesProvider = ({children}) => {
    let data = {
        FormCliente:(config={})=><Suspense fallback={<Cargando/>}><FormCliente config={config}/></Suspense>,
        FormProveedor:(config={})=><Suspense fallback={<Cargando/>}><FormProveedor config={config}/></Suspense>,
        Nosotros:(config={})=><Suspense fallback={<Cargando/>}><Nosotros config={config}/></Suspense>,
        Home:(config={})=><Suspense fallback={<Cargando/>}><Home config={config}/></Suspense>,
        Productos:(config={})=><Suspense fallback={<Cargando/>}><Productos config={config}/></Suspense>,
        DashProductos:(config={})=><Suspense fallback={<Cargando/>}><DashProductos config={config}/></Suspense>,
        FormLogin:(config={})=><Suspense fallback={<Cargando/>}><FormLogin config={config}/></Suspense>,
        Logout:(config={})=><Suspense fallback={<Cargando/>}><Logout config={config}/></Suspense>,

    }
    return (<ComponentesContex.Provider value={data}>{children}</ComponentesContex.Provider>
    );
}
export {ComponentesProvider}
export default ComponentesContex;
