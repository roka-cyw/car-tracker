import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useParams } from 'wouter'

import MapContainer from '../components/MapContainer'

import { Container, MapSection, BackButton, ActionButton, ErrorMessage } from '../styles/pages/map/MapPage.styles'

import useVehicleTracking from '../hooks/useVehicleTracking'
import vehiclesData from '../data/vehicles'
import type { Vehicle } from '../types'

const MapPage = () => {
  const { vehicleId } = useParams()
  const [, setLocation] = useLocation()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const { isTracking, startTracking, stopTracking, setMapInstance } = useVehicleTracking(vehicle as Vehicle)

  useEffect(() => {
    const findVehicle = vehiclesData.find(car => car.id === Number(vehicleId))

    if (findVehicle) {
      setVehicle(findVehicle as Vehicle)
      toast.success('Vehicle found')
    }
  }, [vehicleId])

  const handleMapLoad = (map: mapboxgl.Map) => {
    setMapInstance(map)
    toast.success('Map loaded successfully')
  }

  const handlePrevPage = () => {
    setLocation(`/`)
  }

  if (!vehicle) {
    return (
      <Container>
        <ErrorMessage>
          Vehicle not found
          <br />
          <BackButton onClick={handlePrevPage} style={{ marginTop: '1rem' }}>
            ← Back to the list
          </BackButton>
        </ErrorMessage>
      </Container>
    )
  }

  return (
    <Container>
      <div>
        {vehicle.status === 'available' && (
          <>
            {!isTracking ? (
              <ActionButton $primary onClick={startTracking}>
                Start tracking
              </ActionButton>
            ) : (
              <ActionButton $danger onClick={stopTracking}>
                Stop tracking
              </ActionButton>
            )}
          </>
        )}
      </div>

      <MapSection>
        <MapContainer vehicle={vehicle} onMapLoad={handleMapLoad} />
      </MapSection>
    </Container>
  )
}

export default MapPage
