import { BrowserRouter, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Cadastro from "./pages/cadastro";
import Checkout from "./pages/checkout";
import Home from "./pages/home";
import Petshop from "./pages/petshop";

export default function Routes(){

    return(
        <>
        <BrowserRouter>
            <Route path="/" exact component={Home}/>
            <Route path="/petshop/:id" exact component={Petshop}/>
            <Route path="/cadastro" exact component={Cadastro}/>
            <Route path="/checkout" exact component={Checkout}/>
            <Sidebar/>
        </BrowserRouter>
        </>
    )
}

