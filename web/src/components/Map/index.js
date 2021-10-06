import { useSelector } from 'react-redux'
import './styles.css'

import { key_maps } from '../../keys'
import GoogleMapsReact from 'google-map-react'
import Marker from '../Marker'

export default function Map({petshop}){

    const { mapCenter } = useSelector((state) => state.shop)

    return(
        <div className="container-map">
            <GoogleMapsReact
                bootstrapURLKeys={{ key: key_maps.key }}
                center={mapCenter}
                defaultZoom={15}
            >
                {petshop.map( (p) => <Marker key={p.id} petshop={p} lat={p.location.lat} lng={p.location.lng}/>)}
            </GoogleMapsReact>
        </div>  
    )
}