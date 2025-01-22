import React, { useContext, useEffect, useState } from 'react';
import Graneros from '../../../../indexDB/Graneros';
import { useLocation, useParams } from 'react-router-dom';
import AuthContex from '../../../../contex/AuthContex';
import axios from 'axios';

const Comprar = () => {
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState([]);
    const [price, setPrice] = useState(0);
    const locacion = useLocation();
    const {auth, setAuth} = useContext(AuthContex);
    const almacen = new Graneros();
    const {compraID} = useParams();

    const pagar = ()=>{
        if(producto.length){
            let f = almacen.new("compra",{
                productos: producto,
                usuario: auth.id,
                fecha:new Date().toUTCString(),
                price
            },(f)=>{
                window.location.replace("/compras/"+f);
            })
            producto.map(a=>{
                almacen.delete("carrito",a.id);
            })
            setProducto([]);
        }
    }

    useEffect(() => {

        axios({
            method: 'get',
            url: "https://api.escuelajs.co/api/v1/products/",
        }).then((req)=>{
            console.log(req);
            if(req.status ==200){
                almacen.get("carrito",function(a){
                    let b = [];
                    console.log(auth)
                    a.map((l)=>{
                        if(l.usuario == auth.id){
                            req.data.map(reqP=>{
                                if(reqP.id == l.producto){
                                    l.producto = reqP;
                                    b.push(l);
                                }
                            })
                        }
                    })
                    setProductos(b);
                })
            }
        })


        
        return () => {
            
        };
    }, []);

    useEffect(() => {
        if(compraID == undefined){
            console.log("hola")
            setProducto(productos);
        }else{
            console.log("holi")
            productos.map((k)=>{
                if(k.producto.id == parseInt(compraID)){
                    let j = [k];
                    setProducto(j);
                }
            })
        }
    }, [productos]);

    useEffect(() => {
        let P = 0;
        producto.map((f)=>{
            let TP = f.cantidad * f.producto.price;
            P += TP;
        })
        setPrice(P)
        return () => {
            
        };
    }, [producto]);

    return (
        <div id='Comprar'>
            <div>
                {
                    producto.map((d)=>{
                        console.log(d)
                        return <div className='PC'>
                            <div className='PC-img'>
                                <img src={d.producto.images[0]} alt="" />
                            </div>
                            <div className='PC-info'>
                                <p>{d.producto.title}</p>
                                <p>cantidad {d.cantidad}</p>
                                <p>${d.cantidad*d.producto.price}</p>
                            </div>
                        </div>
                    })
                }

            </div>
            <div className='TP'>
                <div className='TP-C1'>
                    <p>pagas</p>
                    <p>$ {price}</p>
                </div>
                <div>
                    <button onClick={pagar}>pagar</button>
                </div>
            </div>
        </div>
    );
}

export default Comprar;
