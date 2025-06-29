import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { Container, LoadingOverlay, MapWrapper } from '../styles/pages/map/MapContainer.styles'

const MapContainer = () => {
  const [isMapLoading, setIsMapLoading] = useState(true)
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null)

  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN

    if (!mapboxToken) {
      toast.error('Failed to fetch map')
      console.error('Double check the token')
      setIsMapLoading(false)
      return
    }

    mapboxgl.accessToken = mapboxToken

    // Created map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-122.45154, 37.74551], // center of the city
      zoom: 13,
      pitch: 45,
      bearing: 45
    })

    map.current.on('load', () => {
      setIsMapLoading(false)

      // TODO: create car mark

      setMapInstance(map.current)
      toast.success('Map created')
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
  }, [])

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
