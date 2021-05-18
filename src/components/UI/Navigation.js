import React from 'react';

import classes from './Navigation.module.css';

const Navigation = (props) => {
    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <button>About</button>
                </li>
                <li>
                    <button>Home</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
