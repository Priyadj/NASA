import React from 'react';
import './Header.css';

export default class Header extends React.Component {
    render(){
        return(
            <React.Fragment>
                <h1 data-testid="header-text" className={'header-name'}>NASA Media Search</h1>
            </React.Fragment>
        );
    }
}