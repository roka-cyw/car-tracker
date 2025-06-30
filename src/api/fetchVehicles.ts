import vehiclesData from '../data/vehicles'

const fetchVehicles = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return vehiclesData
}

export default fetchVehicles
