import React from 'react';

const FormProveedor = () => {
    return (
        <div class="q">
        <div class="divprin">
            <div class="PRIN1">
                <form action="http://127.0.0.1:5500/index.html">
                    <h1 id="">PROVEEDOR</h1>
                    <label for="NAME">NOMBRE</label>
                    <input type="text" id="nombre" title="INGRESE NOMBRE"/>

                    <label for="tel">TELEFONO</label>
                    <input type="text" id="tel" pattern="\d+" title="INGRESE TELEFONO"/>

                    <label for="cedula">CEDULA</label>
                    <input type="text" id="cedula" title="INGRESE CEDULA"/>

                    <select name="tppcedula" id="tpp.cedula">
                        <option value="dni">DNI</option>
                        <option value="CC">CC</option>
                        <option value="PASAPORTE">PASAPORTE</option>
                    </select>

                    <label for="nit">NIT</label>
                    <input type="text" id="nit" pattern="\d+" title="INGRESE NIT"/>

                    <label for="razonsocial">Razon social</label>
                    <input type="text" id="Razonsocial" title="RAZON SOCIAL"/>

                    <input type="submit" value="enviar"/>
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
                <tbody><tr>
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

export default FormProveedor;
