import React, { useEffect, useState } from 'react';

const usePaginate = (url=null) => {
    const [error, setError] = useState(null);
    const [current, setCurrent] = useState(null);
    const [pages, setPages] = useState([]);
    const [pagesAll, setPagesAll] = useState([]);
    const getData = async (url)=>{
        // console.log(url)
        let data = await fetch(url).catch((err)=>{
            setError(err);
        })
        let datos = await data.json();
        // console.log(datos)
        if(datos.to){
            setCurrent(datos);
        }

    }
    const nextPage = ()=>{
        if(current && current.next_page_url){
            getData(current.next_page_url);
        }
    } 
    useEffect(() => {
        if(url){
            // console.log(url)
            getData(url);
        }
    }, []);

    useEffect(() => {
        if(current){
            let pageSave = true;
            pages.map((R)=>{
                if(R.current_page == current.current_page){
                    pageSave = false;
                }
            });
            if(pageSave){
                setPages([...pages,current])
                setPagesAll([...pagesAll,...current.data])
            }
            // getData(url);
            // if(current && current.next_page_url){
            //     nextPage();
            // }
            // console.log(current)
            // console.log(pages)
            // console.log(pagesAll)
        }
        // console.log(current)
        // console.log(pages)
        // console.log(pagesAll)
    }, [current]);

    // return [pagesAll,nextPage]
    return{
        error,
        current,
        pages,
        pagesAll,
        nextPage
    };
}

export default usePaginate;
