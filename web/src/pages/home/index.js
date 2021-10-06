import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestPetshops } from '../../store/modules/shop/actions';

import '../../styles/global.css';
import './styles.css';

import Header from '../../components/Header';
import Petshop from '../../components/Petshop';
import Map from '../../components/Map';

export default function Home() {

    const dispatch = useDispatch(); 
    const { petshops } = useSelector( (state) => state.shop);

    useEffect( () => {
        dispatch(requestPetshops());
    }, [dispatch])

    return (
        <div className="h-100 ">
            <Header />
            <div className="container-fluid petshop-list-container py-0 mb-0">
                <div className="col-12 px-4 text-center">
                    <h5>Mais próximos de você ({petshops.length})</h5>
                </div>
                <ul className="col-12 petshop-list">
                    {petshops.map((p) => <Petshop key={p.id} petshop={p} />)}
                </ul>
            </div>
            <Map petshop={petshops}/>
            
        </div>
    )
}