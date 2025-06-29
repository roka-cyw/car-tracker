import styled from 'styled-components'

const Container = styled.div`
  position: relative;
`

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border-radius: 12px;

  span {
    font-size: 1.1rem;
    color: #6b7280;
  }
`

const MapWrapper = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  .mapboxgl-ctrl-attrib {
    font-size: 10px;
  }
`

export { Container, LoadingOverlay, MapWrapper }
