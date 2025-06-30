import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { useQuery } from '@tanstack/react-query'

import { Container, Title, Subtitle } from '../styles/pages/home/HomePage.styles'
import * as SC from '../styles/pages/home/VehicleCard.styles'

import fetchVehicles from '../api/fetchVehicles'
import useVehicleTracking from '../hooks/useVehicleTracking'
import { getStatusColor, getButtonText, getButtonProps, getStatusText } from '../utils/utils'
import type { Vehicle } from '../types'

const HomePage = () => {
  const [, setLocation] = useLocation()
  const { stopTracking } = useVehicleTracking()

  const { data, isPending, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles
  })

  const handleVehicleAction = (vehicle: Vehicle) => () => {
    if (vehicle.status === 'available' || vehicle.status === 'working') {
      setLocation(`/map/${vehicle.id}/${vehicle.name}/${vehicle.model}`)
    }
  }

  useEffect(() => {
    stopTracking()
  }, [stopTracking])

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Container>
      <Title>Car's list</Title>
      <Subtitle>Select available car for tracking</Subtitle>

      <SC.VehicleGrid>
        {data.map(vehicle => (
          <SC.VehicleCard key={vehicle.id} $available={vehicle.status === 'available'}>
            <SC.VehicleHeader>
              <SC.VehicleInfo>
                <SC.VehicleName>{vehicle.name}</SC.VehicleName>
                <SC.VehicleModel>Model: {vehicle.model}</SC.VehicleModel>
              </SC.VehicleInfo>
              <SC.StatusBadge $color={getStatusColor(vehicle.status)}>{getStatusText(vehicle.status)}</SC.StatusBadge>
            </SC.VehicleHeader>

            <SC.VehicleDetails>
              <SC.DetailRow>
                <span>📍Location</span>
                <span>{vehicle.location}</span>
              </SC.DetailRow>

              <SC.DetailRow>
                <span>🔋Battery level</span>
                <span>{vehicle.batteryLevel}%</span>
              </SC.DetailRow>

              <SC.BatteryBar>
                <SC.BatteryLevel $level={vehicle.batteryLevel} />
              </SC.BatteryBar>

              <SC.DetailRow>
                <span>🕒 Last update:</span>
                <span>{vehicle.lastUpdate}</span>
              </SC.DetailRow>

              {vehicle.status === 'working' && (
                <>
                  <SC.DetailRow>
                    <span>⚙️ Current task:</span>
                    <span>{vehicle.currentTask}</span>
                  </SC.DetailRow>
                  <SC.DetailRow>
                    <span>⏱️Completion time:</span>
                    <span>{vehicle.estimatedCompletion}</span>
                  </SC.DetailRow>
                </>
              )}

              {vehicle.status === 'unavailable' && (
                <>
                  <SC.DetailRow>
                    <span>🚨 Reason:</span>
                    <span>{vehicle.reason}</span>
                  </SC.DetailRow>
                </>
              )}
            </SC.VehicleDetails>

            <SC.ActionButton
              {...getButtonProps(vehicle.status)}
              onClick={handleVehicleAction(vehicle as Vehicle)}
              disabled={vehicle.status === 'Unavailable'}
            >
              {getButtonText(vehicle.status)}
            </SC.ActionButton>
          </SC.VehicleCard>
        ))}
      </SC.VehicleGrid>
    </Container>
  )
}

export default HomePage
