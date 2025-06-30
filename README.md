# 🚗 Car Tracker

A real-time vehicle tracking application with interactive map visualization and GPS simulation.

## 🚀 Live Demo

🔗 **[View Live Application](https://car-tracker-app-beta.vercel.app/)**

## 🌟 Features

- **Interactive Map**: Real-time vehicle tracking on Mapbox GL JS
- **GPS Simulation**: Mock WebSocket connection simulating GPS data streams
- **Route Visualization**: Dynamic route rendering with progress tracking
- **Real-time Updates**: Live position updates with smooth animations
- **Vehicle Management**: Browse available vehicles and track their status
- **Responsive Design**: Mobile-friendly interface with modern UI

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Styled Components** - CSS-in-JS styling solution
- **Vite** - Fast build tool and dev server

### State Management & Data

- **TanStack Query** - Server state management and caching
- **React Hot Toast** - Beautiful notifications

### Maps & Real-time

- **Mapbox GL JS** - Interactive maps and geospatial data
- **Socket.io Client** - WebSocket simulation for real-time updates
- **Custom WebSocket Mock** - GPS data simulation
- **Get Route steps** - [GPS data simulation](https://nominatim.openstreetmap.org/ui/search.html)

### Routing

- **Wouter** - Lightweight React router

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- Mapbox API Token

## 🔧 Available Scripts

- npm run dev - Start development server
- npm run build - Build for production
- npm run preview - Preview production build
- npm run lint - Run ESLint

## 🗂️ Project Structure

```text
src/
├── components/          # Reusable UI components
│   └── MapContainer.tsx # Main map component
├── pages/              # Page components
│   ├── HomePage.tsx    # Vehicle list page
│   └── MapPage.tsx     # Vehicle tracking page
├── hooks/              # Custom React hooks
│   └── useVehicleTracking.ts
├── services/           # External services
│   └── mockWebSocket.ts # GPS simulation
├── api/                # API and external services
│   ├── vehicleApi.ts   # Data fetching
├── data/               # Mock data
│   └── vehicles.ts     # Vehicle data
├── styles/             # Styled components
│   ├── Global.styles.ts
│   └── components/     # Component-specific styles
└── types/              # TypeScript definitions
    └── index.ts
```

## 🌍 Environment Variables

VITE_MAPBOX_TOKEN=your_mapbox_access_token

## 🎯 Key Features Explained

### Real-time GPS Simulation

- Mock WebSocket connection simulates GPS data every 2 seconds
- Smooth vehicle movement animations between route points
- Progress tracking with visual indicators

### Interactive Map Features

- Vehicle markers with status information
- Route visualization with completed/remaining segments
- Dynamic map centering and zoom controls

### Vehicle Status Management

- Available, Working, Unavailable states
- Battery level monitoring
- Last update timestamps
- Task assignment capabilities
