const vehiclesData = [
  {
    id: 1,
    name: 'Lexus ES',
    model: '300h Luxury',
    status: 'available',
    location: 'Mission St & 16th St',
    coordinates: [-122.41961, 37.76528], // Mission St & 16th St
    batteryLevel: 87,
    lastUpdate: '2 min ago',
    route: [
      [-122.41961, 37.76528], // Mission St & 16th St
      [-122.41936, 37.76181], // Mission St
      [-122.41912, 37.75834], // Mission St
      [-122.41888, 37.75487], // Mission St
      [-122.41864, 37.7514], // Mission St
      [-122.4184, 37.74793] // Mission St
    ]
  },
  {
    id: 2,
    name: 'Toyota Highlander',
    model: 'THH-XLE-AWD',
    status: 'available',
    location: 'Valencia St & 23rd St',
    coordinates: [-122.42078, 37.76097], // Valencia St & 23rd St
    batteryLevel: 93,
    lastUpdate: '1 min ago',
    route: [
      [-122.42078, 37.76097], // Valencia St & 23rd St
      [-122.41942, 37.76097], // 23rd St & Mission St
      [-122.41806, 37.76097], // 23rd St & Capp St
      [-122.4167, 37.76097], // 23rd St & S Van Ness Ave
      [-122.41534, 37.76097], // 23rd St & Folsom St
      [-122.41398, 37.76097] // 23rd St & Harrison St
    ]
  },
  {
    id: 3,
    name: 'Acura RDX',
    model: 'RDX-ASPEC-2025',
    status: 'working',
    location: 'Capp St & 21st St',
    coordinates: [-122.41806, 37.76355], // Capp St & 21st St
    batteryLevel: 45,
    lastUpdate: '30 sec ago',
    currentTask: 'Delivery to the storage',
    estimatedCompletion: '2 hours',
    route: [
      [-122.41806, 37.76355], // Capp St & 21st St
      [-122.41806, 37.76226], // Capp St & 22nd St
      [-122.41806, 37.76097], // Capp St & 23rd St
      [-122.4167, 37.76097], // 23rd St & S Van Ness
      [-122.4167, 37.76226], // S Van Ness & 22nd
      [-122.4167, 37.76355] // S Van Ness & 21st St
    ]
  },
  {
    id: 4,
    name: 'Tesla Model Y',
    model: 'TMY-LR-AWD',
    status: 'unavailable',
    location: 'Service Station',
    coordinates: [-122.41942, 37.75581], // Mission St & Cesar Chavez
    batteryLevel: 0,
    lastUpdate: '6 hours ago',
    reason: 'Scheduled maintenance',
    route: []
  }
]

export default vehiclesData
