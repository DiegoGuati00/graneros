import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SliderThumbnails from '../../../SliderThumbnails';
import AuthContex from '../../../../contex/AuthContex';
import Swal from 'sweetalert2';
import Graneros from '../../../../indexDB/Graneros';

const Producto = () => {
    const almacen = new Graneros();
    const {productoID,productoTitulo} = useParams();
    const navigate = useNavigate();
    const {auth, setAuth} = useContext(AuthContex);
    const [producto, setProducto] = useState({});

    useEffect(() => {
        axios({
            method: 'get',
            url: "https://api.escuelajs.co/api/v1/products/"+productoID,
          }).then((req)=>{
            if(req.status == 200){
                if(!productoTitulo){
                    let t = req.data.title;
                    t = t.replaceAll(" ","-")
                    navigate("/producto/"+productoID+"/"+t)
                }
                setProducto(req.data)
            }
            console.log(req)
        }).catch((err)=>{
            navigate("/")
        });
    }, []);
    return (
        <div id='Producto'>
            <div className='C-Producto'>
                <div className='C-slider'>
                    <SliderThumbnails galeria={producto.images}/>
                </div>
                <div className='C-1'>
                    <div className='C-info'>
                        <div className='C-title'>
                            <p>{producto.title}</p>
                        </div>
                        <div className='C-price'>
                            <p>${producto.price}</p>
                        </div>
                        <div className='C-descripcion'>
                            <p>{producto.description}</p>
                        </div>
                    </div>
                    <div className='C-btns'>
                        <button onClick={(e)=>{
                            if(auth){
                                almacen.get("carrito",(a)=>{
                                    let pID = parseInt(productoID);
                                    let pExis = false;
                                    a.map(p=>{
                                        console.log(p.producto==pID && p.usuario == auth.id)
                                        if(p.producto==pID && p.usuario == auth.id){
                                            pExis = p;
                                        }
                                    })
                                    if(pExis){
                                        almacen.put("carrito",pExis.id,{
                                            usuario:auth.id,
                                            producto:parseInt(productoID),
                                            cantidad:pExis.cantidad+1,
                                        })
                                    }else{
                                        const usuarios = almacen.new("carrito",{
                                            usuario:auth.id,
                                            producto:parseInt(productoID),
                                            cantidad:1,
                                        });
                                    }
                                    Swal.fire({
                                        icon: "success",
                                        title: "produccto agregado al carrito",
                                      });
                                    // console.log(a)
                                    // console.log(usuarios)
                                })
                            }else{
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
                                    }
                                  });
                            }
                        }}
                        >agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Producto;
