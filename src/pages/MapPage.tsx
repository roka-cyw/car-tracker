import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useParams } from 'wouter'
import { useQuery } from '@tanstack/react-query'

import MapContainer from '../components/MapContainer'

import { Container, MapSection, BackButton, ActionButton, ErrorMessage } from '../styles/pages/map/MapPage.styles'

import fetchVehicles from '../api/fetchVehicles'
import useVehicleTracking from '../hooks/useVehicleTracking'
import type { Vehicle } from '../types'

const MapPage = () => {
  const { vehicleId } = useParams()
  const [, setLocation] = useLocation()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const { isTracking, startTracking, stopTracking, setMapInstance } = useVehicleTracking(vehicle as Vehicle)

  const { data, isPending, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles
  })

  const handleMapLoad = (map: mapboxgl.Map) => {
    setMapInstance(map)
    toast.success('Map loaded successfully')
  }

  const handlePrevPage = () => {
    setLocation(`/`)
  }

  useEffect(() => {
    const findVehicle = data?.find(car => car.id === Number(vehicleId))

    if (findVehicle) {
      setVehicle(findVehicle as Vehicle)
      toast.success('Vehicle found')
    }
  }, [data, vehicleId])

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

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
