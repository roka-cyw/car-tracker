import { Router, Route, Switch } from 'wouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import styled from 'styled-components'

import HomePage from './pages/HomePage.jsx'
import MapPage from './pages/MapPage'
import GlobalStyles from './components/styles/GlobalStyles'

const queryClient = new QueryClient()

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <AppContainer>
        <Router>
          <Switch>
            <Route path='/' component={HomePage} />
            <Route path='/map/:tractorId?' component={MapPage} />
            <Route>404 - Page Not Found</Route>
          </Switch>
        </Router>
      </AppContainer>
    </QueryClientProvider>
  )
}

export default App
