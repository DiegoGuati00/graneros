import React, { useContext, useEffect, useState } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import ImgContex from '../../../../contex/ImgContex';
import Graneros from '../../../../indexDB/Graneros';
const Productos = ({config={}}) => {
    const {} = config
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
    useEffect(() => {
        const articulos = almacen.get("productos",(a)=>{
            if(a.length){
                setProductos(a)
            }else{
                let articulo = {
                    nombre:"titulo del articulo",
                    descripcion:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
                    precio:"$10000"
                }
                almacen.new("productos",articulo);
                almacen.new("productos",articulo);
                almacen.new("productos",articulo);
                almacen.get("productos",(a)=>setProductos(a))
            }
        });
        // setInterval(()=>instanceRef.current.next(),2000)
    }, []);
    return (
        <div id='Productos'>
            <div ref={sliderRef} className="keen-slider" >
                <div className='keen-slider__slide C-slide'>
                    <img src={IMGprovider["reImg1"]} alt="" />
                </div>
                <div className='keen-slider__slide C-slide'>
                    <img src={IMGprovider["reImg2"]} alt="" />
                </div>
                <div className='keen-slider__slide C-slide'>
                    <img src={IMGprovider["reImg3"]} alt="" />
                </div>
                <div className='keen-slider__slide C-slide'>
                    <img src={IMGprovider["reImg4"]} alt="" />
                </div>
                <div className='keen-slider__slide C-slide'>
                    <img src={IMGprovider["reImg5"]} alt="" />
                </div>
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
    const {
        nombre="",
        descripcion="",
        precio=""
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
            <div>
                <img src={IMGprovider[imagenes[Math.floor(Math.random() * (4 - 0 + 1)) + 0]]} alt="" />
            </div>
            <div>
                <h2>{nombre}</h2>
                <p>{descripcion}</p>
                <h2>{precio}</h2>
            </div>
        </div>
    );
}

export default Productos;
