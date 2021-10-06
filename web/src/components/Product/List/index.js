import { useDispatch } from 'react-redux';
import { toggleCartProduct } from '../../../store/modules/shop/actions';

import './styles.css';
import '../../../styles/global.css';

export default function ProductItemList({product}) {

    const dispatch = useDispatch();

    return (
        <div className="col-12 product-list">
            <div className="row">
                <div className="col-3">
                    <img src={product.capa} 
                        className="img-fluid"
                        alt="product"/>
                </div>
                <div className="col-6">
                    <h6>
                        <label className="badge badge-secondary">R$ {product.preco}</label>
                    </h6>
                    <span>
                        <b>{product.nome}</b>
                    </span>
                </div>
                <div className="col-3">
                    <button className="rounded-circle btn btn-secondary"
                            onClick={() => {dispatch(toggleCartProduct(product))}}>
                        -
                    </button>
                </div>
            </div>
        </div>
    )
}