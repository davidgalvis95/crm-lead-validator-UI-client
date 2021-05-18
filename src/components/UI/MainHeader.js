import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import {BsPersonFill} from 'react-icons/bs';

const MainHeader = (props) => {
    return (
        <header className={classes['main-header']}>
            <div className={classes['header-left']}>
                <BsPersonFill className={classes['customer-icon']}/>
                <h1>crm lead validator</h1>
            </div>

            {/*<Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />*/}
            <Navigation/>
        </header>
    );
};

export default MainHeader;
