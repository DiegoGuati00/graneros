import './app.css'
import './stiles/app.scss'
import { Suspense, useContext, useEffect, useState } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import textos from './text/app'
import dash from './text/dash'
import useApiContents from './Api-Contents/contex/hooks/useApiContents';
import BuildPage from './pages/BuildPage'
import MenuComp from './componentes/layout/menu-comp';
import FooterPage from './componentes/layout/FooterPage';
import ReactGA from 'react-ga';
import usePaginate from './hook/usePaginate'
import Graneros from './indexDB/Graneros'
import AuthContex from './contex/AuthContex'
import MenuAdmin from './componentes/layout/MenuAdmin'
const TRACKING_ID = import.meta.env.VITE_TRACKING_ID; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  const [count, setCount] = useState(0)
  const [config] = useApiContents({
    // remote:false,
    // remote:'http://localhost/nuevapersona',
    // remote:import.meta.env.VITE_URL_API,
    local: textos
  });
  const almacen = new Graneros();
  // const {pagesAll,error,nexpage} = usePaginate("http://localhost/aplicacion/12");

  // console.log(config);
  // // const hola = JSON.stringify(config) ;
  // // console.log(hola);
  // // console.log(config.tree ? config.tree.tree : []);
  // useEffect(() => { 
  //   if(error){
  //     console.log(error)
  //     // setTimeout(nexpage,10000)
  //   }
  //   if(pagesAll){
  //     console.log(pagesAll)
  //     // setTimeout(nexpage,10000)
  //   }
  //  }, []);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <div className="App">
      <Routes>
      <Route path="dashboard" element={<Private menu={dash.tree ? dash.tree.tree : []} footer={dash.tree ? dash.tree.footer : {}}/>}>
              {
                dash.pages ?
                // console.log(dash.pages)
                dash.pages.map((dataPage,i) => {
                  // console.log(dataPage)
                  if(i==0){
                    return <Route key={dataPage.id.component} index element={<BuildPage config={dataPage} />}/>
                  }else{
                    return <Route key={dataPage.id.component} path={dataPage.id.url} element={<BuildPage config={dataPage} />}/>
                  }
                })
                :null
              }
        </Route>
        <Route path="/" element={<Public menu={config.tree ? config.tree.tree : []} footer={config.tree ? config.tree.footer : {}}/>}>
              {
                config.pages ?
                // console.log(config.pages)
                config.pages.map((dataPage,i) => {
                  // console.log(dataPage)
                  if(i==0){
                    return <Route key={dataPage.id.component} index element={<BuildPage config={dataPage} />}/>
                  }else{
                    return <Route key={dataPage.id.component} path={dataPage.id.url} element={<BuildPage config={dataPage} />}/>
                  }
                })
                :null
              }
        </Route>


      </Routes>
    </div>
  )
}

export function Public({menu=[],footer={}}) {
  return (
    <>
    <Suspense fallback={<Cargando/>}>
      <MenuComp menu={menu}/>
      <Outlet/>
      <FooterPage config={footer}/>
    </Suspense>
    </>
  )
}
export function Private({menu=[],footer={}}) {
  const {authAdmin, setAuthAdmin} = useContext(AuthContex);
  const almacen = new Graneros();
  const locacion = useLocation();
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
            // window.location.replace("/dashboard")
        },parseInt(cookiesLogin.admin_access_token))
        console.log(cookiesLogin)
    }else{
      if(locacion.pathname != "/dashboard/loginAdmin"){
        // window.location.replace("/dashboard/loginAdmin")
      }
    }
},[]);
  return (
    <>
    <Suspense fallback={<Cargando/>}>
      <MenuAdmin menu={menu}/>
      <Outlet/>
      <FooterPage config={footer}/>
    </Suspense>
    </>
  )
}

const Cargando = ()=>{
  return(
      <div>
          <h2>cargando...</h2>
      </div>
)
}

export default App
