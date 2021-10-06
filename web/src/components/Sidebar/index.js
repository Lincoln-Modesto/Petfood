import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import './styles.css';

import Dock from 'react-dock';
import ProductItemList from '../Product/List';

export default function Sidebar() {

    const { cart } = useSelector((state) => state.shop);
    const total = cart.reduce((total, product) => {
        return total + product.preco;
    }, 0)

    const [opened, setOpened] = useState(false);

    useEffect(() => {
        window.addEventListener('openCart', () => setOpened(true))
    }, [])

    return (
        <Dock
            position="right"
            isVisible={opened}
            onVisibleChange={(visible) => setOpened(visible)}
        >
            <div className="container-fluid sidebar h-100 pt-4">
                <h5>Minha Sacola {cart.length}</h5>

                <div className="row products">
                    {cart.map((p) => <ProductItemList product={p} />)}
                </div>

                <div className="footer row">
                    <div className="col-12 d-flex justify-content-between align-items-center h-50">
                        <b className="d-inline-block">Total</b>
                        <h3 className="d-inline-block">R$ {total.toFixed(2)}</h3>
                    </div>
                    <Link to="/cadastro" onClick={() => setOpened(false)} className="btn btn-block btn-primary btn-block rounded-0 h-50 align-center py-3">
                            <span className="txt-btn">Finalizar Compra</span> 
                    </Link>
                </div>
            </div>
        </Dock>
    )
}