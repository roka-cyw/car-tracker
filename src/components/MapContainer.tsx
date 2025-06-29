import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { Container, LoadingOverlay, MapWrapper } from '../styles/pages/map/MapContainer.styles'
import type { Vehicle } from '../../types'

interface Props {
  vehicle: Vehicle
  onMapLoad: (map: mapboxgl.Map) => void
}

const MapContainer = ({ vehicle, onMapLoad }: Props) => {
  const [isMapLoading, setIsMapLoading] = useState(true)

  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const vehicleMark = useRef<mapboxgl.Marker | null>(null)

  const createVehicleMark = () => {
    if (!map.current) return

    const vehicleElement = document.createElement('div')
    vehicleElement.innerHTML = '🚗'
    vehicleElement.style.fontSize = '24px'
    vehicleElement.style.cursor = 'pointer'

    vehicleMark.current = new mapboxgl.Marker({
      element: vehicleElement,
      anchor: 'center'
    })
      // .setLngLat(vehicle.coordinates)
      .setLngLat([-122.41961, 37.76528]) // center of the city
      .addTo(map.current)
  }

  useEffect(() => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN

    if (!mapboxToken) {
      toast.error('Failed to fetch map')
      console.error('Double check the token')
      setIsMapLoading(false)
      return
    }

    mapboxgl.accessToken = mapboxToken

    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v12',
      // center: vehicle.coordinates,
      center: [-122.41961, 37.76528], // center of the city

      zoom: 13,
      pitch: 45,
      bearing: 45
    })

    map.current.on('load', () => {
      setIsMapLoading(false)

      createVehicleMark()

      // TODO: set up moving route

      if (onMapLoad && map.current) {
        onMapLoad(map.current)
        toast.success('Map created')
      }
    })

    map.current.on('error', err => {
      toast.error('Failed to load map')
      console.error('Failed to load map', err)
      setIsMapLoading(false)
    })

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [vehicle])
  // onMapLoad is absent because I have infinite loop

  return (
    <Container>
      {isMapLoading && (
        <LoadingOverlay>
          <span>🗺️ Map is loading...</span>
        </LoadingOverlay>
      )}
      <MapWrapper ref={mapContainer} />
    </Container>
  )
}

export default MapContainer
