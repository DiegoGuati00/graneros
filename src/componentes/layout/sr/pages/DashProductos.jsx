import React, { useEffect, useState } from 'react';
import Graneros from '../../../../indexDB/Graneros';

const DashProductos = () => {
    const [btnNombre, setBtnNombre] = useState();
    const [btnDescripcion, setBtnDescripcion] = useState();
    const [btnPrecio, setBtnPrecio] = useState();
    const [listArticulos, setListArticulos] = useState([]);
    const [formAction, setFormAction] = useState("C");
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
            nombre:btnNombre,
            descripcion:btnDescripcion,
            precio:btnPrecio
        }
        console.log(articulo)
        if(formAction == "C"){
            const newarticulo = almacen.new("productos",articulo);
        }else{
            const newarticulo = almacen.put("productos",formAction,articulo);
            setFormAction("C")
        }
        const articulos = almacen.get("productos",(a)=>setListArticulos(a));
        setBtnNombre("")
        setBtnDescripcion("")
        setBtnPrecio("")
    }
    const editarArticulo = (id)=>{
        const articulos = almacen.get("productos",(a)=>{
            setBtnNombre(a.nombre)
            setBtnDescripcion(a.descripcion)
            setBtnPrecio(a.precio)
            setFormAction(id)
        },id);
    }
    const eliminarArticulo = (id)=>{
        const articulos = almacen.delete("productos",id);
        const articuloss = almacen.get("productos",(a)=>setListArticulos(a));
    }
    useEffect(() => {
        const articulos = almacen.get("productos",(a)=>setListArticulos(a));
    }, []);
    return (
        <div class="q2">
            <div class="divprin">
                <div class="PRIN1">
                    <form onSubmit={seend}>
                        <h1>CLIENTE</h1>
                        <label htmlFor="nombreC">NOMBRE</label>
                        <input onChange={(e)=>setBtnNombre(e.target.value)} value={btnNombre} id="nombreC" type="text"  title="INGRESE NOMBRE" />

                        <label htmlFor="CCcedula">descripcion</label>
                        <input onChange={(e)=>setBtnDescripcion(e.target.value)} value={btnDescripcion} type="text" id="CCcedula" title="INGRESE CEDULA" />
                        <label htmlFor="precio">precio</label>
                        <input onChange={(e)=>setBtnPrecio(e.target.value)} value={btnPrecio} type="text" id="precio" title="INGRESE CEDULA" />

                        <input type="submit" value={formAction=="C"?"crear":"editar"} />
                    </form>
                </div>
            </div>

            <div class="prin2">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>DESCRIPCION</th>
                            <th>PRECIO</th>
                            <th>operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listArticulos.map((v,i)=>{

                                return <tr key={i}>
                                    <td>{v.id}</td>
                                    <td>{v.nombre}</td>
                                    <td>{v.descripcion}</td>
                                    <td>{v.precio}</td>
                                    <td>
                                        <button onClick={()=>editarArticulo(v.id)}>editar</button>
                                        <button onClick={()=>eliminarArticulo(v.id)}>eliminar</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody></table>
            </div>
        </div>
    );
}

export default DashProductos;
