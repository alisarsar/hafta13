import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

function Index() {
    const [goster, gosterGuncelle] = useState(true)

    return (
        <>
            {goster ? <App /> : "Uygulama kapatıldı"}
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Index />
    </>
);

