
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from "leaflet"
import assurances from "./Data"
import userGeolocation from "./UserGeolocation"
import { useRef } from 'react'
import { Button } from 'react-bootstrap'

const markericon =new L.Icon({
  iconUrl:require('../../../images/téléchargement.jpg'),
  iconSize:[35,45],
  iconAnchor:[17,46],
  popupAnchor:[3,-46]
})

const TrouveAgence = () => {
  const position = {lat:33.8439408,lng: 9.400138}
  const location=userGeolocation();
  const mapRef = useRef();
  const ZOOM_LEVEL=9;
  
const showMyLocation=()=>{
  if (location.loaded && !location.error) {
    mapRef.current.leafletElement.flyTo([location.coordinates.lat,location.coordinates.lng],ZOOM_LEVEL,{animate:true})
    
  } else {
    alert(location.error.message)
  }
}
  return (
    <div>

    <MapContainer
    center={position}
    zoom={10}
    style={{ width:'100vw',height:'100vh'}}
    >
    
    <TileLayer
    url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=NGTvdR16ss2N89Q05zRm"
    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    />
  
  
    {assurances.map(assurance=>(
    <Marker position={[assurance.lat,assurance.lng]} icon={markericon} >
    <Popup>
      <b>{assurance.adress}</b>
    </Popup>

  </Marker>
    ))

    }
    {location.loaded && !location.error &&(
      <Marker icon={markericon} position={[location.coordinates.lat,location.coordinates.lng]}></Marker>
    )}
   

    </MapContainer>

    


    </div>
  )
}
export default TrouveAgence;



  
