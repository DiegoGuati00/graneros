import React, { useContext, useEffect, useState } from 'react';
import AuthContex from '../../../../contex/AuthContex';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Graneros from '../../../../indexDB/Graneros';
import axios from 'axios';
import Producto from './Producto';

const Carrito = () => {
    const {auth, setAuth} = useContext(AuthContex);
    const navigate = useNavigate();
    const almacen = new Graneros();
    const [carro, setCarro] = useState([]);
    const [price, setPrice] = useState(0);
    const changeCantidad = (p,cantidad) => {
        console.log(cantidad)
        console.log(p)
        almacen.put("carrito",p.id,{
            cantidad:parseInt(cantidad),
            producto:p.producto.id,
            usuario:p.usuario
        })
        let a = carro;
        let b = [];
        let t = 0;
        a.map(c=>{
            if(c.id == p.id){
                p.cantidad = parseInt(cantidad);
                b.push(p)
                t += c.producto.price * p.cantidad
            }else{
                b.push(c);
                t += c.producto.price * c.cantidad
            }
        })
        console.log(b)
        setCarro(b);
        setPrice(t);
    }
    
    const deleteProducto = (p) => {
        console.log(p)
        almacen.delete("carrito",p.id);
        let a = carro;
        let b = [];
        let t = 0;
        a.map(c=>{
            if(c.id != p.id){
                b.push(c);
                t += c.producto.price * c.cantidad
            }
        })
        // console.log(b)
        setCarro(b);
        setPrice(t);
    }

    useEffect(() => {
        setTimeout(() => {
            if(!auth){
                const swalWithBootstrapButtons = Swal.mixin({
                    // customClass: {
                    //   confirmButton: "btn btn-success",
                    //   cancelButton: "btn btn-danger"
                    // },
                    // buttonsStyling: false
                  });
                  swalWithBootstrapButtons.fire({
                    title: "¿tienes una cuenta?",
                    // text: "No autenticado",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "login",
                    cancelButtonText: "crear cuenta",
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/login")
                    //   swalWithBootstrapButtons.fire({
                    //     title: "Deleted!",
                    //     text: "Your file has been deleted.",
                    //     icon: "success"
                    //   });
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                        navigate("/registroUsuario")
                    //   swalWithBootstrapButtons.fire({
                    //     title: "Cancelled",
                    //     text: "Your imaginary file is safe :)",
                    //     icon: "error"
                    //   });
                    }else{
                        navigate("/")
                    }
                  });
            }else{
                axios({
                    method: 'get',
                    url: "https://api.escuelajs.co/api/v1/products/",
                  }).then((req)=>{
                    console.log(req)
                    if(req.status == 200){
                        const p = req.data;
                        const listP = [];
                        let total = 0;
                        almacen.get("carrito",(c)=>{
                            c.map(a=>{
                                if(a.usuario == auth.id){
                                    p.map((cp)=>{
                                        // console.log(cp.id == a.producto)
                                        if(cp.id == a.producto){
                                            console.log(total)
                                            a.producto = cp
                                            total += cp.price * a.cantidad
                                            listP.push(a)
                                        }
                                    })
                                }
                            })
                            setCarro(listP);
                            setPrice(total);
                        });
                        console.log(listP)
                        // a.producto = req.data
                        // carro.push(a)
                    }
                })
            }
            
        }, 3000);
    }, []);
    return (
        <div id='Carrito'>
            <div>
            {
                carro.map((c,i)=>{
                    return <Prooducto p={c} evento={changeCantidad} deletee={deleteProducto}/>
                })
            }
            </div>
            <div className='Detalles'>
                <div className='D-C1'>
                    <p>resumen de compra</p>
                </div>
                <div className='D-C2'>
                    <p>Total</p>
                    <p>${price}</p>
                </div>
                <div className='D-C3'>
                    <button onClick={()=>{window.location.replace("/comprar")}}>comprar ahora</button>
                </div>
            </div>
        </div>
    );
}

const Prooducto = ({p,evento,deletee}) => {
    const [img, setImg] = useState("");
    const [cantidad, setCantidad] = useState(p.cantidad);
    useEffect(() => {
        let img = p.producto.images[0];
        img = img.replaceAll("[","")
        img = img.replaceAll("]","")
        img = img.replaceAll("\"","")
        img = img.replaceAll("\\","")
        setImg(img)
    }, []);
    return (
        <div className='Producto'>
            <div className='P-img'>
                <img src={img} alt="" />
            </div>
            <div className='P-info'>
                <div className='info-title'>
                    <p>{p.producto.title}</p>
                </div>
                <div className='info-btns'>
                    <button onClick={()=>deletee(p)}>Eliminar</button>
                    <button onClick={()=>{window.location.replace("/comprar/"+p.producto.id)}}>Comprar ahora</button>
                </div>
                <div className='info-cantidad'>
                    <input type="number" min={0} value={cantidad} onChange={(e)=>{
                        if(e.target.value < 0){
                            setCantidad(0)
                            evento(p,0)
                        }else{
                            setCantidad(e.target.value)
                            evento(p,e.target.value)
                        }
                    }} name="" id="" />
                </div>
                <div className='info-price'>
                    <p>${p.producto.price*p.cantidad}</p>
                </div>
            </div>
        </div>
    )
}

export default Carrito;
