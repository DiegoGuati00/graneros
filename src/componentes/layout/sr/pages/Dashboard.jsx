import React, { useEffect } from 'react';
import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css"
import Slider from '../../../Slider';
import NavLink from '../../../../Api-Contents/contex/hooks/NavLink';

const Dashboard = ({config={}}) => {
    const {} = config;

    const [categorias, setCategorias] = useState([]);
    const [productosAll, setProductosAll] = useState([]);
    const [productos, setProductos] = useState([]);

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
        rtl: false,
        slides: {
          perView: 3,
          spacing: 10,
        },
        breakpoints:{
            '(min-width: 100px)':{
                slides: {
                    perView: 1,
                    spacing: 10,
                }
            },
            '(min-width: 500px)':{
                slides: {
                    perView: 2,
                    spacing: 10,
                }
            },
            '(min-width: 800px)':{
                slides: {
                    perView: 3,
                    spacing: 10,
                }
            }
        }
    },pluginSlider)

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
        // const usuarios = almacen.new("usuarios",{clave:"as",nombre:"123456789"});
        // console.log(mision);
        // console.log(usuarios);
        // console.log(usuarios);
    }, []);
    return (
        <div id='Home'>
            <div>
                <div className='view-S'>
                    <div>
                        <select name="" id="" onChange={(e)=>{
                            let a = parseInt(e.target.value);
                            let b = [];
                            console.log(a)
                            if(a){
                                productosAll.map(p=>{
                                    if(p.category.id == a){
                                        b.push(p)
                                    }
                                })
                                setProductos(b);
                            }else{
                                setProductos(productosAll);
                            }
                        }}>
                            <option value=""> --- --- ---</option>
                            {
                                categorias.map((c,i)=>{
                                    return <option value={c.id}>{c.name}</option>

                                })
                            }
                        </select>
                    </div>

                </div>

                <div className='view-P'>
                    {
                        productos.map((p)=>{
                            let img = p.images[0];
                            img = img.replaceAll("[","")
                            img = img.replaceAll("]","")
                            img = img.replaceAll("\"","")
                            img = img.replaceAll("\\","")
                            return <NavLink
                                to={'/dashboard/producto/'+p.id}
                                children={
                                    <div className='slider-producto'>
                                        <div className='C-img'>
                                            <img src={img} alt="" />
                                        </div>
                                        <div className='C-title'>
                                            <p>{p.title}</p>
                                        </div>
                                            <p>${p.price}</p>
                                    </div>
                                }
                            />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
