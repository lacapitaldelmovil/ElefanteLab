import { Route, Switch } from 'wouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Casos from './pages/Casos'
import ComoTrabajamos from './pages/ComoTrabajamos'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/servicios" component={Servicios} />
          <Route path="/casos" component={Casos} />
          <Route path="/como-trabajamos" component={ComoTrabajamos} />
        </Switch>
      </Layout>
    </QueryClientProvider>
  )
}