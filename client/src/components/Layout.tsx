import { Link, useLocation } from 'wouter'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="nav">
        <div className="container">
          <ul>
            <li><Link href="/" className={location === '/' ? 'active' : ''}>Inicio</Link></li>
            <li><Link href="/servicios" className={location === '/servicios' ? 'active' : ''}>Servicios</Link></li>
            <li><Link href="/casos" className={location === '/casos' ? 'active' : ''}>Casos de Éxito</Link></li>
            <li><Link href="/como-trabajamos" className={location === '/como-trabajamos' ? 'active' : ''}>Cómo Trabajamos</Link></li>
          </ul>
        </div>
      </nav>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Elefante Lab. Todos los derechos reservados.</p>
          <p>Agencia digital especializada en diseño web, branding y marketing digital.</p>
        </div>
      </footer>
    </div>
  )
}