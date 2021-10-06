import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './styles.css'

import MarkerIcon from '../../assets/marker.png'
import MarkerIconSelected from '../../assets/marker-selected.png'

export default function Marker({petshop}) {

    const { petshopMapSelected } = useSelector(state => state.shop);

    return (
        <Link to={`/petshop/${petshop._id}`}>
        <div>
            <img src={ petshopMapSelected === petshop._id ? MarkerIconSelected : MarkerIcon} 
                alt="marker-icon" />
            <img
                src={petshop.logo}
                className="img-market"
                alt="marker-icon-selected"/>
        </div>
        </Link>
    )
}