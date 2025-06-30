import { useCallback, useState } from 'react'

import { mockWebSocket } from '../services/mockWebSocket'

import type { Vehicle, GPSData, Coordinates } from '../../types'

const useVehicleTracking = (vehicle: Vehicle) => {
  const [isTracking, setIsTracking] = useState(false)
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(null)

  const handleGPSUpdate = useCallback((data: GPSData) => {
    console.log('New position', data.coordinates)

    setCurrentPosition(data.coordinates)

    // Update the map position
    if (window.mapInstance && window.mapInstance.updateVehiclePosition) {
      window.mapInstance.updateVehiclePosition(data.coordinates)
    }

    // Update the route progress
    if (window.mapInstance && window.mapInstance.updateRouteProgress) {
      window.mapInstance.updateRouteProgress(data.index)
    }
  }, [])

  const startTracking = useCallback(() => {
    if (!vehicle || isTracking) return

    console.log('Start tracking')

    mockWebSocket.subscribe(handleGPSUpdate)
    mockWebSocket.start(vehicle)

    setIsTracking(true)
  }, [vehicle, isTracking, handleGPSUpdate])

  const stopTracking = useCallback(() => {
    console.log('Stop tracking')

    mockWebSocket.unsubscribe(handleGPSUpdate)
    mockWebSocket.stop()

    setIsTracking(false)
  }, [])

  const setMapInstance = useCallback((mapInstance: mapboxgl.Map) => {
    window.mapInstance = mapInstance
  }, [])

  return {
    isTracking,
    currentPosition,
    startTracking,
    stopTracking,
    setMapInstance
  }
}

export default useVehicleTracking
