import React, { useState } from 'react';
import Graneros from '../../../indexDB/Graneros';

const FormCliente = () => {
    const almacen = new Graneros();
    const [data, setData] = useState([]);
    const [dataF, setDataF] = useState({});

    const changeData = (text,name)=>{
        data[name] = text;
        setData(data);
    }

    const seend = (e)=>{
        e.preventDefault();
        // const usuarios = almacen.get("usuarios",check);
        // window.location.reload();
    }


    return (
        <div class="q2">
            <div class="divprin">
                <div class="PRIN1">
                    <form onClick={seend}>
                        <h1>CLIENTE</h1>
                        <label for="nombreC">NOMBRE</label>
                        <input type="text" id="nombreC" title="INGRESE NOMBRE" />

                        <label for="CCcedula">CEDULA</label>
                        <input type="text" id="CCcedula" title="INGRESE CEDULA" />

                        <select name="tppcedula" id="tpp.cedula">
                            <option value="dni">DNI</option>
                            <option value="CC">CC</option>
                            <option value="PASAPORTE">PASAPORTE</option>
                        </select>

                        <label for="telC">TELEFONO</label>
                        <input type="text" id="telC" pattern="\d+" title="INGRESE TELEFONO" />

                        <label for="razonsocial">Razon social</label>
                        <input type="text" id="razonsocialC" title="INGRESE RAZON SOCIAL" />

                        <input type="submit" value="enviar" />
                    </form>
                </div>
            </div>

            <div class="prin2">
                <table>
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>FECHA</th>
                            <th>DINERO INGRESADO</th>
                            <th>TIPO DE DOCUMENTO</th>
                            <th>NIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>JULIO</td>
                            <td>20/noviembre/2024/</td>
                            <td>3.000</td>
                            <td>CC</td>
                            <td>2937892389</td>
                        </tr>
                        <tr>
                            <td>JULIO</td>
                            <td>20/noviembre/2024/</td>
                            <td>3.000</td>
                            <td>CC</td>
                            <td>2937892389</td>
                        </tr>
                        <tr>
                            <td>JULIO</td>
                            <td>20/noviembre/2024/</td>
                            <td>3.000</td>
                            <td>CC</td>
                            <td>2937892389</td>
                        </tr>
                        <tr>
                            <td>JULIO</td>
                            <td>20/noviembre/2024/</td>
                            <td>3.000</td>
                            <td>CC</td>
                            <td>2937892389</td>
                        </tr>
                        <tr>
                            <td>JULIO</td>
                            <td>20/noviembre/2024/</td>
                            <td>3.000</td>
                            <td>CC</td>
                            <td>2937892389</td>
                        </tr>
                        <tr>
                            <td>JULIO</td>
                            <td>20/noviembre/2024/</td>
                            <td>3.000</td>
                            <td>CC</td>
                            <td>2937892389</td>
                        </tr>
                        <tr>
                            <td>JULIO</td>
                            <td>20/noviembre/2024/</td>
                            <td>3.000</td>
                            <td>CC</td>
                            <td>2937892389</td>
                        </tr>
                    </tbody></table>
            </div>
        </div>
    );
}

export default FormCliente;
