import React, { useState } from "react";
import Header from "../components/Header";
import Album from "../components/Album";
import Footer from "../components/Footer";

function Main() {
    const [query, setQuery] = useState('');

    return (
        <>
            <Header onSubmit={resp => setQuery(resp)} />
            <Album query={query} />
            <Footer />
        </>
    );
};

export default Main;