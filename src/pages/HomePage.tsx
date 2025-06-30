import { useLocation } from 'wouter'
import { useQuery } from '@tanstack/react-query'

import { Container, Title, Subtitle } from '../styles/pages/home/HomePage.styles'
import {
  VehicleGrid,
  VehicleCard,
  VehicleHeader,
  VehicleInfo,
  VehicleName,
  VehicleModel,
  StatusBadge,
  ActionButton
} from '../styles/pages/home/VehicleCard.styles'

import fetchVehicles from '../api/fetchVehicles'
import { getStatusColor, getButtonText, getButtonProps, getStatusText } from '../utils/utils'
import type { Vehicle } from '../types'

const HomePage = () => {
  const [, setLocation] = useLocation()

  const { data, isPending, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles
  })

  const handleVehicleAction = (vehicle: Vehicle) => () => {
    if (vehicle.status === 'available' || vehicle.status === 'working') {
      setLocation(`/map/${vehicle.id}/${vehicle.name}/${vehicle.model}`)
    }
  }

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Container>
      <Title>Car's list</Title>
      <Subtitle>Select available car for tracking</Subtitle>

      <VehicleGrid>
        {data.map(vehicle => (
          <VehicleCard key={vehicle.id} $available={vehicle.status === 'available'}>
            <VehicleHeader>
              <VehicleInfo>
                <VehicleName>{vehicle.name}</VehicleName>
                <VehicleModel>Model: {vehicle.model}</VehicleModel>
              </VehicleInfo>
              <StatusBadge $color={getStatusColor(vehicle.status)}>{getStatusText(vehicle.status)}</StatusBadge>
            </VehicleHeader>

            <ActionButton
              {...getButtonProps(vehicle.status)}
              onClick={handleVehicleAction(vehicle as Vehicle)}
              disabled={vehicle.status === 'Unavailable'}
            >
              {getButtonText(vehicle.status)}
            </ActionButton>
          </VehicleCard>
        ))}
      </VehicleGrid>
    </Container>
  )
}

export default HomePage
