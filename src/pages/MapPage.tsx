import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useParams } from 'wouter'
import { useQuery } from '@tanstack/react-query'

import * as SC from '../styles/pages/map/MapPage.styles'
import MapContainer from '../components/MapContainer'

import fetchVehicles from '../api/fetchVehicles'
import useVehicleTracking from '../hooks/useVehicleTracking'
import type { Vehicle } from '../types'
import { getStatusColor, getStatusText } from '../utils/utils'

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
    stopTracking()
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
      <SC.Container>
        <SC.ErrorMessage>
          Vehicle not found
          <br />
          <SC.BackButton onClick={handlePrevPage} style={{ marginTop: '1rem' }}>
            ← Back to the list
          </SC.BackButton>
        </SC.ErrorMessage>
      </SC.Container>
    )
  }

  return (
    <SC.Container>
      <SC.Header>
        <SC.VehicleInfo>
          <SC.Title>🚗 {vehicle.name}</SC.Title>
          <SC.Subtitle>Tracking model {vehicle.model}</SC.Subtitle>
        </SC.VehicleInfo>

        <SC.StatusSection>
          <SC.StatusBadge $color={getStatusColor(vehicle.status)}>{getStatusText(vehicle.status)}</SC.StatusBadge>
          <SC.BackButton onClick={handlePrevPage}>← Back to the list</SC.BackButton>
        </SC.StatusSection>
      </SC.Header>

      <SC.ControlPanel>
        <SC.ControlPanelGrid>
          <SC.InfoCard>
            <SC.InfoLabel>Model</SC.InfoLabel>
            <SC.InfoValue>{vehicle.model}</SC.InfoValue>
          </SC.InfoCard>

          <SC.InfoCard>
            <SC.InfoLabel>Location</SC.InfoLabel>
            <SC.InfoValue>{vehicle.location}</SC.InfoValue>
          </SC.InfoCard>

          <SC.InfoCard>
            <SC.InfoLabel>battery level</SC.InfoLabel>
            <SC.InfoValue>{vehicle.batteryLevel}</SC.InfoValue>
          </SC.InfoCard>

          <SC.InfoCard>
            <SC.InfoLabel>Last update</SC.InfoLabel>
            <SC.InfoValue>{vehicle.lastUpdate}</SC.InfoValue>
          </SC.InfoCard>
        </SC.ControlPanelGrid>

        <>
          {vehicle.status === 'available' && (
            <>
              {!isTracking ? (
                <SC.ActionButton $primary onClick={startTracking}>
                  Start tracking
                </SC.ActionButton>
              ) : (
                <SC.ActionButton $danger onClick={stopTracking}>
                  Stop tracking
                </SC.ActionButton>
              )}
            </>
          )}

          {vehicle.status === ' working' && <SC.ActionButton disabled>⚙️ {vehicle.currentTask}</SC.ActionButton>}
        </>
      </SC.ControlPanel>

      <SC.MapSection>
        <MapContainer vehicle={vehicle} onMapLoad={handleMapLoad} />
      </SC.MapSection>
    </SC.Container>
  )
}

export default MapPage
