import { Router, Route, Switch } from 'wouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'

import GlobalStyles from './components/styles/Global.styles.js'
import AppContainer from './components/styles/containers/App.styles.js'
import { Header, HeaderContent, HeaderTitle } from './components/styles/header/Header.styles.js'
import MainContent from './components/styles/containers/Main.styles.js'
import ContentCard from './components/styles/containers/ContentCard.styles.js'
import ErrorContainer from './components/styles/containers/ErrorContainer.styles.js'

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
                <Route path='/map/:tractorId?' component={MapPage} />
                <Route>
                  <ErrorContainer>404 - Page not found</ErrorContainer>
                </Route>
              </Switch>
            </Router>
          </ContentCard>
        </MainContent>
      </AppContainer>
    </QueryClientProvider>
  )
}

export default App
