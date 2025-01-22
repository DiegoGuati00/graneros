import React, { useContext, useEffect, useState } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import ImgContex from '../../../../contex/ImgContex';
import Graneros from '../../../../indexDB/Graneros';
const Productos = ({config={}}) => {
    const {} = config
    const [categorias, setCategorias] = useState([]);
    const [productosAll, setProductosAll] = useState([]);
    const [productos, setProductos] = useState([]);
    const almacen = new Graneros();
    const pluginSlider = [
        (slider) => {
            let timeout
            let mouseOver = false
            function clearNextTimeout() {
              clearTimeout(timeout)
            }
            function nextTimeout() {
              clearTimeout(timeout)
              if (mouseOver) return
              timeout = setTimeout(() => {
                slider.next()
              }, 2000)
            }
            slider.on("created", () => {
              slider.container.addEventListener("mouseover", () => {
                mouseOver = true
                clearNextTimeout()
              })
              slider.container.addEventListener("mouseout", () => {
                mouseOver = false
                // if(instanceRef.current.)
                nextTimeout()
              })
              nextTimeout()
            })
            slider.on("dragStarted", clearNextTimeout)
            slider.on("animationEnded", nextTimeout)
            slider.on("updated", nextTimeout)
          }
    ]
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
      },pluginSlider)
    const IMGprovider = useContext(ImgContex);
    const changeProducto = (c) => {
        const newProductos = [];
        productosAll.map((a)=>{
            if(a.category.id == c.id){
                newProductos.push(a)
            }
        })
        setProductos(newProductos)
    }

    useEffect(() => {
        const categorias = ()=>{
            const response = fetch("https://api.escuelajs.co/api/v1/categories");
            response.then((e)=>{
                e.json().then((a=>{
                    setCategorias(a)
                    console.log(a)
                }))
            })
        }
        const productos = ()=>{
            const response = fetch("https://api.escuelajs.co/api/v1/products");
            response.then((e)=>{
                e.json().then((a=>{
                    setProductos(a)
                    setProductosAll(a)
                    console.log(a)
                }))
            })
        }
        categorias()
        productos()

        // const articulos = almacen.get("productos",(a)=>{
        //     if(a.length){
        //         setProductos(a)
        //     }else{
        //         let articulo = {
        //             nombre:"titulo del articulo",
        //             descripcion:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
        //             precio:"$10000"
        //         }
        //         almacen.new("productos",articulo);
        //         almacen.new("productos",articulo);
        //         almacen.new("productos",articulo);
        //         almacen.get("productos",(a)=>setProductos(a))
        //     }
        // });
        // setInterval(()=>instanceRef.current.next(),2000)
    }, []);
    return (
        <div id='Productos'>



            <div ref={sliderRef} className="keen-slider" >
                {
                    categorias.map((a)=>{
                        instanceRef.current.update()
                        // console.log(instanceRef.current.update())
                        return <div className='keen-slider__slide C-slide'>
                            <img src={a.image} alt="" />
                        </div>
                    })
                }
            </div>

            <div style={{
                display:"flex",
                margin:"1rem",
                overflow:"auto",
                }}>
                {
                    categorias.map((a)=>{
                        return <div
                            style={{
                                background:"white",
                                margin:".5rem",
                                borderRadius:".5rem"
                                // position:"absolute"
                            }}
                            onClick={(e)=>changeProducto(a)}
                        >
                            <div style={{
                                    minWidth:"100px",
                                    minHeight:"100px",
                                    margin:"1rem",
                                    // position:"absolute",
                                    }}>
                                
                                <img src={a.image} alt="" />
                            </div>
                            <p 
                            style={{
                                position:"relative",
                                textAlign:"center",
                                padding:".5rem"
                            }}
                            >{a.name}</p>
                        </div>
                    })
                }
                
            </div>

            <div className='C1'>
                {
                    productos.map((v,i)=>{
                        return <Cart key={i} config={v}/>
                    })
                }
            </div>
        </div>
    );
}

const Cart = ({config={}})=>{
    const pluginSlider = [
        (slider) => {
            let timeout
            let mouseOver = false
            function clearNextTimeout() {
              clearTimeout(timeout)
            }
            function nextTimeout() {
              clearTimeout(timeout)
              if (mouseOver) return
              timeout = setTimeout(() => {
                slider.next()
              }, 2000)
            }
            slider.on("created", () => {
              slider.container.addEventListener("mouseover", () => {
                mouseOver = true
                clearNextTimeout()
              })
              slider.container.addEventListener("mouseout", () => {
                mouseOver = false
                // if(instanceRef.current.)
                nextTimeout()
              })
              nextTimeout()
            })
            slider.on("dragStarted", clearNextTimeout)
            slider.on("animationEnded", nextTimeout)
            slider.on("updated", nextTimeout)
          }
    ]
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
      },pluginSlider)
    const {
        title="",
        description="",
        price="",
        images=[

        ]
    } = config;
    const IMGprovider = useContext(ImgContex);
    const imagenes = [
        "reImg1",
        "reImg2",
        "reImg3",
        "reImg4",
        "reImg5"
    ];
    return (
        <div className='Cart'>
            <div ref={sliderRef} className="keen-slider">
                {
                    images.map((a,i)=>{
                       return <div className='keen-slider__slide C-slide'>
                            <img src={a} alt="" />
                        </div>
                    })
                }
                {/* <img src={IMGprovider[imagenes[Math.floor(Math.random() * (4 - 0 + 1)) + 0]]} alt="" /> */}
                
            </div>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <h2>${price}</h2>
            </div>
        </div>
    );
}

export default Productos;
