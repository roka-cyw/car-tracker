import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { Container, LoadingOverlay, MapWrapper } from '../styles/pages/map/MapContainer.styles'

import type { Vehicle, Coordinates, RoutePointMarker } from '../../types'

interface Props {
  vehicle: Vehicle
  onMapLoad: (map: mapboxgl.Map) => void
}

const MapContainer = ({ vehicle, onMapLoad }: Props) => {
  const [isMapLoading, setIsMapLoading] = useState(true)

  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const vehicleMark = useRef<mapboxgl.Marker | null>(null)
  const routePointMarkers = useRef<RoutePointMarker[]>([])

  const createVehicleMark = () => {
    if (!map.current || !vehicle) return

    const vehicleElement = document.createElement('div')
    vehicleElement.innerHTML = '🚗'
    vehicleElement.style.fontSize = '24px'
    vehicleElement.style.cursor = 'pointer'

    vehicleMark.current = new mapboxgl.Marker({
      element: vehicleElement,
      anchor: 'center'
    })
      .setLngLat(vehicle.coordinates)
      .addTo(map.current)
  }

  const createCarRoute = () => {
    if (!map.current) return

    map.current.addSource('route-full', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: vehicle.route
        }
      }
    })

    map.current.addSource('route-completed', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      }
    })

    map.current.addLayer({
      id: 'route-full',
      type: 'line',
      source: 'route-full',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#10b981',
        'line-width': 4,
        'line-opacity': 0.7
      }
    })

    map.current.addLayer({
      id: 'route-completed',
      type: 'line',
      source: 'route-completed',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#0000FF',
        'line-width': 4,
        'line-opacity': 1
      }
    })

    routePointMarkers.current = []
    vehicle.route.forEach((point, index) => {
      if (!map.current) return

      const routePoint = document.createElement('div')
      routePoint.style.width = '8px'
      routePoint.style.height = '8px'
      routePoint.style.backgroundColor = '#10b981'
      routePoint.style.borderRadius = '50%'
      routePoint.style.border = '2px solid white'
      routePoint.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)'

      const marker = new mapboxgl.Marker({
        element: routePoint,
        anchor: 'center'
      })
        .setLngLat(point as [number, number])
        .addTo(map.current)

      routePointMarkers.current.push({
        marker,
        element: routePoint,
        index
      })
    })

    const bounds = new mapboxgl.LngLatBounds()
    vehicle.route.forEach(point => bounds.extend(point as [number, number]))
    map.current.fitBounds(bounds, { padding: 50, maxZoom: 15 })
  }

  const updateVehiclePosition = (newCoordinates: Coordinates): void => {
    if (vehicleMark.current) {
      console.log('Update vehicle postions to: ', newCoordinates)

      animateVehicle(newCoordinates)
    }
  }

  const updateRouteProgress = (currentIndex: number) => {
    console.log('Update route color')

    if (!map.current || currentIndex < 0) return

    const completedCoordinates = vehicle.route.slice(0, currentIndex + 1)

    const newRouteSource = map.current.getSource('route-completed') as mapboxgl.GeoJSONSource
    if (newRouteSource) {
      newRouteSource.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: completedCoordinates
        }
      })
    }

    routePointMarkers.current.forEach(({ element, index }) => {
      if (index <= currentIndex) {
        element.style.backgroundColor = '#0000FF'
      }
    })
  }

  const animateVehicle = (newCoordinates: Coordinates): void => {
    if (!vehicleMark.current || !map.current) return

    const currentPos = vehicleMark.current.getLngLat()
    const targetPos = newCoordinates

    console.log('Animaion from:', [currentPos.lng, currentPos.lat], 'к:', targetPos)

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0

    const animate = () => {
      if (!vehicleMark.current) return

      currentStep++
      const progress = currentStep / steps

      const currentLng = currentPos.lng + (targetPos[0] - currentPos.lng) * progress
      const currentLat = currentPos.lat + (targetPos[1] - currentPos.lat) * progress

      vehicleMark.current.setLngLat([currentLng, currentLat])

      if (currentStep < steps) {
        setTimeout(animate, stepDuration)
      } else {
        console.log('Animation finished')
      }
    }

    animate()

    map.current.easeTo({
      center: targetPos as [number, number],
      duration: duration
    })
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
      center: vehicle.coordinates,
      zoom: 13,
      pitch: 45,
      bearing: 45
    })

    map.current.on('load', () => {
      setIsMapLoading(false)

      createVehicleMark()

      if (vehicle.route && vehicle.route.length > 0) {
        createCarRoute()
      }

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
  }, []) // onMapLoad is absent because I have infinite loop

  useEffect(() => {
    if (map.current) {
      map.current.updateVehiclePosition = updateVehiclePosition
      map.current.updateRouteProgress = updateRouteProgress
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
