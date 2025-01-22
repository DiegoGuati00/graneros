import React, { useContext, useEffect, useState } from 'react';
import Graneros from '../../../../indexDB/Graneros';
import AuthContex from '../../../../contex/AuthContex';
import { useParams } from 'react-router-dom';

const Compras = () => {
    const {auth, setAuth} = useContext(AuthContex);
    const {compraID = null} = useParams();
    const almacen = new Graneros();
    const [compras, setCompras] = useState([]);
    useEffect(() => {
        console.log(compraID)
        almacen.get("compra",(a)=>{
            let b = [];
            a.map((c)=>{
                if(c.usuario == auth.id){
                    b.push(c);
                }
            })
            setCompras(b)
            console.log(b)
        })
        return () => {
            
        };
    }, []);
    return (
        <div id='Compras'>
            {
                compraID ? 
                <div className='CP-0'>
                    {
                        compras.map(a=>{
                            if(a.id == parseInt(compraID)){
                                return <div >
                                    {
                                        a.productos.map(p=>{
                                            return <div className='CP-producto'>
                                                <div className='CP-producto_img'>
                                                    <img src={p.producto.images[0]} alt="" />
                                                </div>
                                                <div className='CP-producto_info'>
                                                    <div>
                                                        <p>{p.producto.title}</p>
                                                        <p>Cantidad {p.cantidad}</p>
                                                        <p>Unidad $ {p.producto.price}</p>
                                                        <p>Total $ {p.cantidad * p.producto.price}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        })
                                    }
                                    <div className='CP-Total'>
                                        <p>Total Compra $ {a.price}</p>
                                    </div>
                                </div>

                            }
                        })
                    }
                </div>
                :
                <div className='CP'>
                    {
                        compras.map(a=>{
                            return <div className='CP-C1'  onClick={(e)=>{window.location.replace("/compras/"+a.id)}}>
                                <div>
                                    <p>{a.fecha}</p>
                                </div>
                                <div>
                                    <fieldset>
                                        <legend>Productos</legend>
                                        {
                                            a.productos.map((c)=>{
                                                return <div>
                                                    <p>{c.producto.title}</p>
                                                </div>
                                            })
                                        }
                                    </fieldset>
                                </div>
                                <div className='CP-price'>
                                    <p>${a.price}</p>
                                    
                                </div>
                            </div>
                        })
                    }
                </div>

            }
        </div>
    );
}

export default Compras;
