import { useLocation } from 'wouter'

import { Container, Title, Subtitle } from '../components/styles/home/HomePage.styles'
import {
  TractorGrid,
  TractorCard,
  TractorHeader,
  TractorInfo,
  TractorName,
  TractorModel,
  StatusBadge,
  ActionButton
} from '../components/styles/home/VehicleCard.styles'

import vehiclesData from '../data/vehicles'
import { getStatusColor, getButtonText, getButtonProps, getStatusText } from '../utils/utils'

const HomePage = () => {
  const [, setLocation] = useLocation()

  const handleVehicleAction = vehicle => () => {
    if (vehicle.status === 'available' || vehicle.status === 'working') {
      setLocation(`/map/${vehicle.name}-${vehicle.model}`)
      // setLocation(`/map/${vehicle.id}`)
    }
  }

  return (
    <Container>
      <Title>Car's list</Title>
      <Subtitle>Select available car for tracking</Subtitle>

      <TractorGrid>
        {vehiclesData.map(vehicle => (
          <TractorCard key={vehicle.id} available={vehicle.status === 'available'}>
            <TractorHeader>
              <TractorInfo>
                <TractorName>{vehicle.name}</TractorName>
                <TractorModel>Model: {vehicle.model}</TractorModel>
              </TractorInfo>
              <StatusBadge color={getStatusColor(vehicle.status)}>{getStatusText(vehicle.status)}</StatusBadge>
            </TractorHeader>

            <ActionButton
              {...getButtonProps(vehicle.status)}
              onClick={handleVehicleAction(vehicle)}
              disabled={vehicle.status === 'Unavailable'}
            >
              {getButtonText(vehicle.status)}
            </ActionButton>
          </TractorCard>
        ))}
      </TractorGrid>
    </Container>
  )
}

export default HomePage
