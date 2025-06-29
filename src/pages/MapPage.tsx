import { useState } from 'react'
import toast from 'react-hot-toast'

import MapContainer from '../components/MapContainer'

import { Container, MapSection } from '../styles/pages/map/MapPage.styles'
import type { Vehicle } from '../../types'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ef4444;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
`

const MapPage = () => {
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)

  const handleMapLoad = (map: mapboxgl.Map) => {
    setMapInstance(map)
    toast.success('Map loaded successfully')
  }

  // if (!vehicle) {
  //   return (
  //     <Container>
  //       <ErrorMessage>Error: Vehicle not found</ErrorMessage>
  //     </Container>
  //   )
  // }

  return (
    <Container>
      <MapSection>
        <MapContainer vehicle={vehicle} onMapLoad={handleMapLoad} />
      </MapSection>
    </Container>
  )
}

export default MapPage
