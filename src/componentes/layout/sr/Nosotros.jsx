import React from 'react';
import YoutubeEmbet from '../../youtubeEmbet';

const Nosotros = ({config={}}) => {
    const {
        mision = "",
        vision = ""
    } = config;
    console.log(config)
    return (
        <div>
            <YoutubeEmbet/>
            <div id='Nosotros'>
                {/* <h1>ACERCA DE NOSOTROS</h1> */}
                <div className='C1'>
                    <div className="C1-sub">
                        <h2>Nuestra vision es:</h2>
                        <p>{mision}</p>
                    </div>
                    <div className="C1-sub">
                        <h2>Nuestra mision es:</h2>
                        <p>{vision}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nosotros;
