import { setPetshopMapSelected, setMapCenter } from '../../store/modules/shop/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/global.css';
import './styles.css';

export default function Petshop({petshop}) {
    
    const { petshopMapSelected } = useSelector(state => state.shop);
    const dispatch = useDispatch();

    function setSelectedPetshop(){
        dispatch(setPetshopMapSelected(petshop._id));
        dispatch(setMapCenter(petshop.location));
    }

    return (
        <li className={`d-inline-block petshop ${ petshopMapSelected === petshop._id ? 'active' : '' }`}
            onClick={() => setSelectedPetshop()}>

            <div className="d-inline-block">
                <img src={petshop.logo}
                    className="img-fluid "
                    alt="petshop-img"/>
            </div>

            <div className="d-inline-block pl-3 align-bottom">
                <b>{petshop.nome}</b>
                <div className="petshop-infos">
                    <span className="mdi mdi-star"></span>
                    <small>
                        <b>2,8</b>
                    </small>
                    <span className="mdi mdi-cash-usd-outline"></span>
                    <small>
                        <b>$$$</b>
                    </small>
                    <span className="mdi mdi-crosshairs-gps"></span>
                    <small>
                        <b>1,7 km</b>
                    </small>
                </div>
                <label className="badge badge-secondary">Frete Grátis</label>
            </div>

        </li>
    )
}