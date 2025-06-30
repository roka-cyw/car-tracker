type GPSCallback = (data: GPSData) => void
type Coordinates = [number, number] | number[]

interface GPSData {
  coordinates: Coordinates
  timestamp: number
  index: number
  total: number
}

interface Vehicle {
  id: number
  name: string
  model: string
  status: string
  location: string
  coordinates: [number, number]
  batteryLevel: number
  lastUpdate: string
  route: number[][]
  currentTask?: string
}

interface RoutePointMarker {
  element: HTMLDivElement
  index: number
  marker: mapboxgl.Marker
}

declare module 'mapbox-gl' {
  interface Map {
    updateVehiclePosition?: (coordinates: Coordinates) => void
    updateRouteProgress?: (index: number) => void
  }
}

declare global {
  interface Window {
    mapInstance?: {
      updateVehiclePosition?: (coordinates: Coordinates) => void
      updateRouteProgress?: (index: number) => void
    }
  }
}

export type { Vehicle, GPSCallback, GPSData, Coordinates, RoutePointMarker }
