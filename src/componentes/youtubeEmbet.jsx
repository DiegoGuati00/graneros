import React from 'react';

const YoutubeEmbet = ({config={}}) => {
    console.log(config)
    const{
        ancho = "100%",
        alto = "400px",
        video = '0xhzwDXfLds',
        origin = 'http://localhost/'
    }= config
    return (
    <div>
        <iframe id="player" loading='lazy' type="text/html" width={ancho} height={alto}
            src={`https://www.youtube.com/embed/${video}?enablejsapi=1&origin=${origin}`}
            frameBorder="0">
        </iframe>
    </div>
    );
}

export default YoutubeEmbet;
