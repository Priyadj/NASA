import React, { useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import './Main.css';
import Pages from '../Pages/Pages';

import  { API_KEY} from '../../global';

const getKeywords = (itemData) => {
    if(itemData.length === 0) {
        return [];
        }
    let uniqueKeywords = [];
    itemData.forEach(item => {
        const { data } = item;
        const { keywords } = data[0];
        uniqueKeywords.push(...keywords);
    });

    return [...new Set(uniqueKeywords)]

}

const Main = (props) => {

    const { test_data, error } = props;

    const [pictureDesc, setPictureDesc] = useState(test_data ? test_data : '');

    const [pageData, setPageData] = useState('');

    const [isPageComponentShown, setIsPageComponentShown] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [searchText, setSearchText] =useState('');

    const keywords = getKeywords(pageData);
    console.log(keywords);

    

    useEffect(async ( )=> {
        setIsLoading(true);
        try {
        const response = await axios({
            url:`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&thumbs=true`

        });
        const {data} =  response;
        console.log(response);
        console.log(data);
        setPictureDesc(data);
        setIsLoading(false);
        } catch(err) {
            console.log('SOME ERROR OCCURED', err);
            setIsLoading(false);

        }
        // .then(response =>{
        //     response.json().then(data => {
        //         console.log(data);
        //         setPictureDesc(data);
        //          setIsLoading(false);
        //     })
        // })

    },[]);

    const onSearchHandler = (event) => {
        console.log(event.target.value);
        setSearchText(event.target.value);
    }
    const onsearchBtnHandler = async () => {
        setIsLoading(true);
        const response = await axios({
            url: `https://images-api.nasa.gov/search?q=${searchText}`
        });
        console.log(response);
        const {data} = response;
        const { collection }= data;
        const { items } = collection;
        setPageData(items);
        
        setIsPageComponentShown(true);
        setIsLoading(false);
    }

    return (
        <main>
            {isLoading ? (<h4>Loading...</h4>) : (
                <Fragment>
                    {isPageComponentShown ? (<Pages search_data={pageData} query={searchText} keywords={keywords} />)
                  : (
          <Fragment>     
            <div className="top_container">
                <h2>{pictureDesc.title}</h2>
                <div>
                <input id="search" type="text" value={searchText} onChange={onSearchHandler}/>
                <button className="search_button" type="button" onClick={onsearchBtnHandler}>Search</button>
                </div>
            </div>

            <div className="image_container">
                <img src={pictureDesc.url} />
            </div>

            <div className="down_container">
                <div className="dec_container">
                    <p>{pictureDesc.explanation}</p>
                    <div>
                        <span>{pictureDesc.date}</span>
                        <span>{pictureDesc.copyright}</span>
                    </div>
                </div>
            </div>
            </Fragment>  )}
            </Fragment> ) }
        </main>
    )

    
}

export default  Main 

