import toast from 'react-hot-toast'

import type { GPSCallback, Vehicle } from '../../types'

class MockWebSocket {
  isActive: boolean
  currentIndex: number
  intervalId: NodeJS.Timeout | null
  listeners: GPSCallback[]

  constructor() {
    this.isActive = false
    this.currentIndex = 0
    this.intervalId = null
    this.listeners = []
  }

  subscribe(callback: GPSCallback) {
    this.listeners.push(callback)
  }

  unsubscribe(callback: GPSCallback) {
    const index = this.listeners.indexOf(callback)
    if (index > -1) {
      this.listeners.splice(index, 1)
    }
  }

  start(vehicle: Vehicle) {
    if (this.isActive) return

    toast.success('The car starts moving')
    console.log('The car starts moving')

    this.isActive = true
    this.currentIndex = 0
    const route = vehicle.route

    if (!route || route.length === 0) {
      toast.error('No route found')
      console.error('No route found')
      return
    }

    this.intervalId = setInterval(() => {
      const coordinates = route[this.currentIndex]

      this.listeners.forEach(callback =>
        callback({ coordinates, timestamp: Date.now(), index: this.currentIndex, total: route.length })
      )

      this.currentIndex++

      if (this.currentIndex >= route.length) {
        this.stop()
        toast.success('The car arrives at the destination')
        console.log('The car stops moving')
      }
    }, 2000)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    this.isActive = false
    this.currentIndex = 0

    toast.success('The car stops moving')
    console.log('The car stops moving')
  }

  getStatus() {
    return {
      isActive: this.isActive,
      currentIndex: this.currentIndex
    }
  }
}

export const mockWebSocket = new MockWebSocket()
