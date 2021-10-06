import { useDispatch, useSelector } from 'react-redux';
import { toggleCartProduct } from '../../../store/modules/shop/actions';

import '../../../styles/global.css';
import './styles.css';

export default function ProductItemCard({product}) {

    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.shop);
    const added = cart.findIndex((p) => p._id === product._id) !== -1;

    return (
        <div className="product col-3">
            <img
                src={product.capa}
                className="align-center img-fluid"
                alt="product" />
            <button onClick={() => {dispatch(toggleCartProduct(product))}} 
                    className={`btn btn-${added ? 'secondary' : 'primary'} rounded-circle`}>
                    {added ? '-' : '+'}
            </button>
            <h4>
                <label className="badge badge-secondary price">{`R$ ` + product.preco.toFixed(2)}</label>
            </h4>
            <small>
                <b>{product.nome}</b>
            </small>
        </div>
    )
}