import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestPetshop } from '../../store/modules/shop/actions';
import './styles.css';
import '../../styles/global.css';

import Header from "../../components/Header";
import ProductItemCard from '../../components/Product/Card';

export default function Petshop({match}) {

    const dispatch = useDispatch();
    const { petshop } = useSelector(state => state.shop);
    const { products } = petshop;

    useEffect(() => {
        dispatch(requestPetshop(match.params.id))
    }, [match])

    return (
        <div className="h-100">
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <img src={petshop.logo}
                            className="img-fluid petshop-image" 
                            alt="petshop"/>
                        <b>{petshop.nome}</b>
                        <div className="petshop-infos">
                            <span className="mdi mdi-star"></span>
                            <text>
                                <b>2,8</b>
                            </text>
                            <span className="mdi mdi-cash-usd-outline"></span>
                            <text>
                                <b>{petshop.categoria}</b>
                            </text>
                            <span className="mdi mdi-crosshairs-gps"></span>
                            <text>
                                <b>1,7 km</b>
                            </text>
                        </div>
                        <label className="badge badge-primary">Frete Grátis</label>
                    </div>
                    <div className="col-10 px-5">
                        <h5 className="mb-3">Produtos</h5>

                        <div className="row">
                            {products?.map((p) => <ProductItemCard product={p}/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}