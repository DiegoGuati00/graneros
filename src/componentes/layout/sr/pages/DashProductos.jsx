import React, { useEffect, useState } from 'react';
import Graneros from '../../../../indexDB/Graneros';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const DashProductos = () => {
    const [btnNombre, setBtnNombre] = useState("");
    const [btnDescripcion, setBtnDescripcion] = useState("");
    const [btnPrecio, setBtnPrecio] = useState(0);
    const [btnImages, setBtnImages] = useState([]);
    const [btnImagesUpload, setBtnImagesUpload] = useState([]);
    const [btnCategoria, setBtnCategoria] = useState("");
    const [btnCategorias, setBtnCategorias] = useState([]);
    const [listArticulos, setListArticulos] = useState([]);
    const [formAction, setFormAction] = useState("C");
    const {productoID = null} = useParams()
    const almacen = new Graneros();
    const seend=(e)=>{
        e.preventDefault();
        if(
            !btnNombre ||
            !btnDescripcion||
            !btnPrecio
        ){
            return
        }
        let articulo = {
            title:btnNombre,
            description:btnDescripcion,
            categoryId: parseInt(btnCategoria),
            price:parseInt(btnPrecio)
        }
        console.log(articulo)
        if(formAction == "C"){
            axios({
                method: 'post',
                url: "https://api.escuelajs.co/api/v1/files/upload",
                data: {
                    file:btnImagesUpload[0]
                },
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then(a=>{
                console.log(a)
                articulo.images = [a.data.location];
                axios({
                    method: 'post',
                    url: "https://api.escuelajs.co/api/v1/products/",
                    data: articulo
                }).then(b=>{
                    window.location.replace("/dashboard/producto/"+b.data.id)
                })
            })
        }else{
            if(!btnImagesUpload.length){
                let img = btnImages;
                let lImg = [];
                img.map((i)=>{
                    i = i.replaceAll("[","")
                    i = i.replaceAll("]","")
                    i = i.replaceAll("\"","")
                    i = i.replaceAll("\\","")
                    lImg.push(i)
                })
                articulo.images = lImg;
                axios({
                    method: 'put',
                    url: "https://api.escuelajs.co/api/v1/products/"+productoID,
                    data: articulo
                }).then(b=>{
                    window.location.reload()
                })
            }else{
                axios({
                    method: 'post',
                    url: "https://api.escuelajs.co/api/v1/files/upload",
                    data: {
                        file:btnImagesUpload[0]
                    },
                    headers:{
                        "Content-Type":" multipart/form-data"
                    }
                }).then(a=>{
                    console.log(a)
                    let img = btnImages;
                    let lImg = [];
                    img.map((i)=>{
                        i = i.replaceAll("[","")
                        i = i.replaceAll("]","")
                        i = i.replaceAll("\"","")
                        i = i.replaceAll("\\","")
                        lImg.push(i)
                    })
                    lImg.push(a.data.location)
                    articulo.images = lImg;
                    console.log(articulo)
                    axios({
                        method: 'put',
                        url: "https://api.escuelajs.co/api/v1/products/"+productoID,
                        data: articulo
                    }).then(b=>{
                        window.location.replace("/dashboard/producto/"+b.data.id)
                    })
                })
            }

        }
    }
    const editarArticulo = (id)=>{
        const producto = ()=>{
            const response = fetch("https://api.escuelajs.co/api/v1/products/"+id);
            response.then((e)=>{
                e.json().then((a=>{
                    setBtnNombre(a.title)
                    setBtnDescripcion(a.description)
                    setBtnPrecio(a.price)
                    setFormAction(id)
                    // setProductos(a)
                    // setProductosAll(a)
                    console.log(a)
                }))
            })
        }
        producto()
        // const articulos = almacen.get("productos",(a)=>{
        //     setBtnNombre(a.nombre)
        //     setBtnDescripcion(a.descripcion)
        //     setBtnPrecio(a.precio)
        //     setFormAction(id)
        // },id);
    }
    const eliminarArticulo = (id)=>{
        const producto = ()=>{
            const response = fetch("https://api.escuelajs.co/api/v1/products/"+id, {
                method: "DELETE"
              });
            response.then((e)=>{
                e.json().then((a=>{
                    window.location.replace("/dashboard")
                }))
            })
        }
        producto()
        // const articulos = almacen.delete("productos",id);
        // const articuloss = almacen.get("productos",(a)=>setListArticulos(a));
    }
    const defineProductos = ()=>{
        const response = fetch("https://api.escuelajs.co/api/v1/products");
        response.then((e)=>{
            e.json().then((a=>{
                setListArticulos(a)
                console.log(a)
            }))
        })
    }
    const getProducto = (n,f)=>{
        const response = fetch("https://api.escuelajs.co/api/v1/products/"+n);
        response.then((e)=>{
            e.json().then((a=>{
                f(a)
            })).catch((err)=>{
                window.location.replace("/dashboard")
                console.log(err)
            })
        })
    }
    const deleteImage = (a)=>{
        console.log(a)
        let c = [];
        btnImages.map((b)=>{
            if(b != a){
                c.push(b)
            }
        })
        setBtnImages(c)
    }
    useEffect(() => {
        // console.log(productoID)
        if(productoID){
            getProducto(productoID,(a)=>{
                console.log(a)
                setBtnNombre(a.title)
                setBtnDescripcion(a.description)
                setBtnPrecio(a.price)
                setBtnCategoria(a.category.id)
                setBtnImages(a.images)
                setFormAction("E")
            });
        }
        const categoria = fetch("https://api.escuelajs.co/api/v1/categories");
        categoria.then((e)=>{
            e.json().then((a=>{
                setBtnCategorias(a)
            }))
        })
        // defineProductos()
        // const articulos = almacen.get("productos",(a)=>setListArticulos(a));
    }, []);
    useEffect(() => {

        return () => {
            
        };
    }, [btnImagesUpload]);
    return (
        <div className="q2" id='DashProductos'>
            <div className="divprin">
                <div className="PRIN1">
                    <form onSubmit={seend}>
                        <h1>PRODUCTO</h1>
                        <label htmlFor="nombreC">NOMBRE</label>
                        <input onChange={(e)=>setBtnNombre(e.target.value)} value={btnNombre} id="nombreC" type="text"  title="INGRESE NOMBRE" />

                        <label htmlFor="CCcedula">descripcion</label>
                        <textarea
                         name="" 
                         id="CCcedula"
                         onChange={(e)=>setBtnDescripcion(e.target.value)}
                         value={btnDescripcion}
                         style={{
                            width:"100%",
                            background:"#32cd32",
                            height:"100px"
                         }}
                         >{btnDescripcion}</textarea>
                        {/* <input onChange={(e)=>setBtnDescripcion(e.target.value)} value={btnDescripcion} type="text" id="CCcedula" title="INGRESE CEDULA" /> */}
                        <select name="" id="" onChange={(e)=>setBtnCategoria(e.target.value)} value={btnCategoria}>
                            {
                                btnCategorias.map((a,i)=>{
                                    return <option key={i} value={a.id}>{a.name}</option>
                                })
                            }
                        </select>
                        <label htmlFor="precio">precio</label>
                        <input onChange={(e)=>setBtnPrecio(e.target.value)} value={btnPrecio} type="number" min={0} id="precio" />

                        <div className='C-imagenes'>
                            {
                                btnImages.map((a)=>{
                                    let img = a;
                                    img = img.replaceAll("[","")
                                    img = img.replaceAll("]","")
                                    img = img.replaceAll("\"","")
                                    img = img.replaceAll("\\","")
                                    return <div className='imagenes-C1'>
                                        <p onClick={(e)=>deleteImage(a)}>x</p>
                                        <img src={img} alt="" />
                                    </div>
                                })
                            }
                        </div>
                        <input type="file" name="" id="" onChange={(e)=>{
                            let a = e.target.files;
                            let b = [];
                            for (let index = 0; index <= (a.length-1); index++) {
                                b.push(a[index])
                            }
                            setBtnImagesUpload(b)
                        }}/>
                        <div className='C-imagenes'>
                            {
                                btnImagesUpload.map((a)=>{
                                    return <div className='imagenes-C1'>
                                        <img src={URL.createObjectURL(a)} alt="" />
                                    </div>
                                })
                            }
                        </div>
                        <input type="submit" value={formAction=="C"?"crear":"editar"} />
                    </form>
                </div>
            </div>
            {
                formAction != "C"?
                    <div>
                        <button onClick={()=>{
                            const swalWithBootstrapButtons = Swal.mixin({
                                customClass: {
                                  confirmButton: "btn btn-success",
                                  cancelButton: "btn btn-danger"
                                },
                                buttonsStyling: false
                              });
                              swalWithBootstrapButtons.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Yes, delete it!",
                                cancelButtonText: "No, cancel!",
                                reverseButtons: true
                              }).then((result) => {
                                if (result.isConfirmed) {
                                    eliminarArticulo(productoID)
                                  swalWithBootstrapButtons.fire({
                                    title: "Deleted!",
                                    text: "articulo eliminado",
                                    icon: "success"
                                  });
                                } else if (
                                  /* Read more about handling dismissals below */
                                  result.dismiss === Swal.DismissReason.cancel
                                ) {
                                  swalWithBootstrapButtons.fire({
                                    title: "Cancelled",
                                    // text: "Your imaginary file is safe :)",
                                    icon: "error"
                                  });
                                }
                              });
                        }}>eliminar producto</button>
                    </div>
                :null
            }
        </div>
    );
}

export default DashProductos;
