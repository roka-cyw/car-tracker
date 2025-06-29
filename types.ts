interface Vehicle {
  id: number
  name: string
  model: string
  status: string
  location: string
  coordinates: number[]
  batteryLevel: number
  lastUpdate: string
  route: number[][]
}

export type { Vehicle }
