import { useLocation } from 'wouter'

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

import vehiclesData from '../data/vehicles'
import { getStatusColor, getButtonText, getButtonProps, getStatusText } from '../utils/utils'
import type { Vehicle } from '../types'

const HomePage = () => {
  const [, setLocation] = useLocation()

  const handleVehicleAction = (vehicle: Vehicle) => () => {
    if (vehicle.status === 'available' || vehicle.status === 'working') {
      setLocation(`/map/${vehicle.id}/${vehicle.name}/${vehicle.model}`)
    }
  }

  return (
    <Container>
      <Title>Car's list</Title>
      <Subtitle>Select available car for tracking</Subtitle>

      <VehicleGrid>
        {vehiclesData.map(vehicle => (
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
