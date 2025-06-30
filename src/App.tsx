import { Router, Route, Switch } from 'wouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage.js'
import MapPage from './pages/MapPage'

import GlobalStyles from './styles/Global.styles.js'
import AppContainer from './styles/containers/App.styles.js'
import { Header, HeaderContent, HeaderTitle } from './styles/header/Header.styles.js'
import MainContent from './styles/containers/Main.styles.js'
import ContentCard from './styles/containers/ContentCard.styles.js'
import ErrorContainer from './styles/containers/ErrorContainer.styles.js'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <HeaderContent>
            <HeaderTitle>🚕 Vehicle Tracker</HeaderTitle>
          </HeaderContent>
        </Header>

        <MainContent>
          <ContentCard>
            <Router>
              <Switch>
                <Route path='/' component={HomePage} />
                <Route path='/map/:vehicleId/:vehicleName/:vehicleModel' component={MapPage} />
                <Route>
                  <ErrorContainer>404 - Page not found</ErrorContainer>
                </Route>
              </Switch>
            </Router>
          </ContentCard>

          <Toaster
            toastOptions={{
              success: {
                iconTheme: {
                  primary: 'green',
                  secondary: 'white'
                }
              }
            }}
            position='bottom-right'
          />
        </MainContent>
      </AppContainer>
    </QueryClientProvider>
  )
}

export default App
