import React from 'react';
import './Card.css';

const Card = (props) => {
    const { card_data } = props;
    const { data, links } = card_data;
    const { title, date_created} =data[0];
    const { href } = links[0];

    return (
        <div className="card-section">
            <img src={href} width="100px" />
            <div className="card-details">
                <h6>{title}</h6>
                <span>{new Date(date_created).toLocaleDateString}</span>
            </div>
        </div>
    )
}

export default Card