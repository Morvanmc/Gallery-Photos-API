import React, { useState } from "react";
import './Header.scss';
import { BsSearch } from 'react-icons/bs';

import logo from '../img/logo.png';
import DarkMode from './DarkeMode';


function Header(props) {
    const [text, setText] = useState('');

    const handleQuery = e => {
        e.preventDefault();
        props.onSubmit(text);
        setText('');
    }

    return (
        <header id="header" className="header">
            <div id="logo">
                <a href="/">
                    <img src={logo} alt="Logo Leadster" />
                    <h3>Leadster</h3>
                </a>
            </div>
            <form onSubmit={handleQuery} id="search">
                <BsSearch style={{ color: "#6B6A6A" }} />
                <input type="text" placeholder="Search for photo" value={text}
                    onChange={e => setText(e.target.value)}
                />
            </form>
            <DarkMode />
        </header>
    )
};

export default Header;