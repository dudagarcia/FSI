import React, { useState } from 'react'; //obrigatório pois se usa o JSX


//chaves servem para injetam variavel/propriedade/etc do js no html
function Header (properties){
    const [cont, setCont]=useState(0);
    //Array [valor, funcaoDeAtualizacao]
    function increment()
    {
        setCont(cont+1);
    }
    return(
        <div>
        <Header> 
            <h1> {properties.title} </h1>
            <h3> {properties.children}</h3>
            Contador: { cont }
        </Header> 
        <button onClick={increment}> Incrementar </button>
        </div>
    );
}

export default Header;