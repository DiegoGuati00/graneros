import React, { createContext } from 'react';
import {
    //imagenes
    reImg1,
    reImg2,
    reImg3,
    reImg4,
    reImg5,
    reImg6,
} from '../Resources/resources';

const ImgContex = createContext();
const ImgProvider = ({children}) => {
    let data = {
        // reICoRuedaVerde,
        //imagenes
        reImg1,
        reImg2,
        reImg3,
        reImg4,
        reImg5,
        reImg6,
    }

    return (<ImgContex.Provider value={data}>{children}</ImgContex.Provider>
    );
}
export {ImgProvider}
export default ImgContex;
