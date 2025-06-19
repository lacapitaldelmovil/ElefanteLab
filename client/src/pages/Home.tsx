import { Link } from 'wouter'

export default function Home() {
  return (
    <>
      {/* Header */}
      <section className="header">
        <div className="container">
          <h1>Elefante Lab</h1>
          <h2>Agencia Digital que Impulsa tu Negocio</h2>
          <p>Diseño web, branding y marketing digital para empresas que quieren destacar en el mundo digital</p>
          <Link href="/servicios" className="btn-primary">Conoce Nuestros Servicios</Link>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="section">
        <div className="container">
          <h2>Nuestros Servicios</h2>
          <div className="cards">
            <div className="card">
              <h3>🎨 Diseño Web</h3>
              <p>Creamos sitios web modernos, responsivos y optimizados para convertir visitantes en clientes.</p>
              <ul>
                <li>Diseño personalizado</li>
                <li>Responsive design</li>
                <li>Optimización SEO</li>
                <li>Integración con sistemas</li>
              </ul>
            </div>
            
            <div className="card">
              <h3>🏷️ Branding</h3>
              <p>Desarrollamos identidades visuales memorables que conectan con tu audiencia.</p>
              <ul>
                <li>Logo y identidad visual</li>
                <li>Manual de marca</li>
                <li>Aplicaciones corporativas</li>
                <li>Estrategia de marca</li>
              </ul>
            </div>
            
            <div className="card">
              <h3>📈 Marketing Digital</h3>
              <p>Estrategias digitales que impulsan el crecimiento de tu negocio online.</p>
              <ul>
                <li>Gestión de redes sociales</li>
                <li>Publicidad digital</li>
                <li>Email marketing</li>
                <li>Análisis y reportes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="section" style={{backgroundColor: 'var(--surface)'}}>
        <div className="container">
          <h2>¿Por qué elegir Elefante Lab?</h2>
          <div className="cards">
            <div className="card">
              <h3>💡 Creatividad</h3>
              <p>Cada proyecto es único. Desarrollamos soluciones creativas adaptadas a tus necesidades específicas.</p>
            </div>
            
            <div className="card">
              <h3>🎯 Resultados</h3>
              <p>Nos enfocamos en generar resultados medibles que impacten positivamente en tu negocio.</p>
            </div>
            
            <div className="card">
              <h3>🤝 Colaboración</h3>
              <p>Trabajamos contigo de cerca en cada etapa del proyecto, desde la conceptualización hasta el lanzamiento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de trabajo */}
      <section className="section">
        <div className="container">
          <h2>Nuestro Proceso</h2>
          <div className="cards">
            <div className="card">
              <h3>1. Descubrimiento</h3>
              <p>Entendemos tu negocio, objetivos y audiencia para crear la estrategia perfecta.</p>
            </div>
            
            <div className="card">
              <h3>2. Estrategia</h3>
              <p>Desarrollamos un plan detallado con objetivos claros y métricas de éxito.</p>
            </div>
            
            <div className="card">
              <h3>3. Ejecución</h3>
              <p>Implementamos la solución con atención al detalle y comunicación constante.</p>
            </div>
            
            <div className="card">
              <h3>4. Optimización</h3>
              <p>Monitoreamos resultados y optimizamos continuamente para maximizar el rendimiento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>¿Listo para hacer crecer tu negocio?</h2>
          <p>Conversemos sobre tu proyecto y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.</p>
          <Link href="/casos" className="btn-primary">Ver Casos de Éxito</Link>
        </div>
      </section>
    </>
  )
}