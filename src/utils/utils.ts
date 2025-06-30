export const getStatusColor = status => {
  switch (status) {
    case 'available':
      return '#10b981' // green
    case 'working':
      return '#f59e0b' // orange
    case 'unavailable':
      return '#ef4444' // red
    default:
      return '#6b7280' // grey
  }
}

export const getStatusText = (status: string) => {
  switch (status) {
    case 'available':
      return 'Available'
    case 'working':
      return 'Working'
    case 'unavailable':
      return 'Unavailable'
    default:
      return 'Unknown'
  }
}

export const getButtonText = (status: string) => {
  switch (status) {
    case 'available':
      return '🚕 Pick the car'
    case 'working':
      return '📍 Track on the map'
    case 'unavailable':
      return '⚠️ Unavailable'
    default:
      return 'Unknown'
  }
}

export const getButtonProps = (status: string) => {
  switch (status) {
    case 'available':
      return { $primary: true }
    case 'working':
      return { $secondary: true }
    default:
      return { disabled: true }
  }
}
