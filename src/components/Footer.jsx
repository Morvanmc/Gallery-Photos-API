import React from "react";
import './Footer.scss';
import { RiRegisteredLine } from 'react-icons/ri'

function Footer() {
    return (
        <footer>
            <RiRegisteredLine style={{ color: '#6b6a6a' }} />
            <p>Desenvolvido por Morvan Marques</p>
        </footer>
    );
};

export default Footer;