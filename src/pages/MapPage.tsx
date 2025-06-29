import MapContainer from '../components/MapContainer'

import { Container, MapSection } from '../styles/pages/map/MapPage.styles'

const MapPage = () => {
  return (
    <Container>
      <MapSection>
        <MapContainer />
      </MapSection>
    </Container>
  )
}

export default MapPage
