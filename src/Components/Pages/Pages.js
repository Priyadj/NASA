import React, {useState} from 'react';
import './Pages.css';
import Card from '../Card/Card';

const getCardData = (data, pageNo, maxRecords) => {
    const start =pageNo;
    const end = pageNo + (maxRecords - 1);
    return data.filter((elem, idx) => idx >= start && idx <= end);
}

const Pages = (props) => {

    const { search_data, keywords, query} = props;
    const [currentPage, setCurrentPage] = useState(0);
    const paginationCardData = getCardData(search_data, currentPage, 3);

    const onPreviousHandler = () => {
        setCurrentPage((prevValue) => {
            return prevValue-1;
        })
    }

    const onNextHandler = () => {
        setCurrentPage((prevValue) => {
            return prevValue+1;
        })
    }
    return (
        <div className="page-container">
            <h2>Search Results for {query}</h2>
            {
                paginationCardData.map(data => {
                    return <Card card_data={data} />
                })
            }

            <button disabled={currentPage === 0} onClick={onPreviousHandler}>Previous</button>
            <button disabled={currentPage === search_data.length} onClick={onNextHandler}>Next</button>

            <h4>Related Searches</h4>
            <div className="keywords-section">{
            keywords.filter((e, idx) => idx < 10).map(keyword => {

                return <span>keyword</span>
            })
}
</div>
        </div>
    )
}

export default Pages