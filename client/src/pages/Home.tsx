

export default function Home() {
  return (
    <>
      {/* Header */}
      <section className="header">
        <div className="container">
          <h1>Creamos apps y plataformas que hacen crecer tu negocio desde el primer clic</h1>
          <p>Tecnología pensada para emprendedores, marcas digitales y empresas que quieren crecer rápido y con estilo</p>
          <a href="#contacto" className="btn-primary">Agendar llamada</a>
        </div>
      </section>

      {/* Lo que hacemos */}
      <section className="section">
        <div className="container">
          <h2>Soluciones digitales para quienes venden, crean, inspiran</h2>
          <div className="cards">
            <div className="card">
              <h3>Apps móviles conectadas</h3>
              <p>Tus clientes viven en el móvil. Creamos apps modernas, conectadas a tus sistemas, que venden mientras tú duermes.</p>
            </div>
            
            <div className="card">
              <h3>Plataformas SaaS & Marketplaces</h3>
              <p>Lanza tu propio Amazon, tu escuela online o tu app de servicios. Creamos productos digitales escalables y 100% tuyos.</p>
            </div>
            
            <div className="card">
              <h3>White Label + Automatización</h3>
              <p>Te damos productos listos para usar con tu marca. Automatiza ventas, reservas, pagos y más sin escribir una sola línea de código.</p>
            </div>
            
            <div className="card">
              <h3>Soluciones con IA real</h3>
              <p>Desde asistentes virtuales hasta contenido que se genera solo. Integramos IA útil, no futurista.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué Elefante Lab */}
      <section className="section" style={{backgroundColor: 'var(--surface)'}}>
        <div className="container">
          <h2>Inspirados por lo mejor, pero diseñamos para ti</h2>
          <p>Nos inspira el enfoque profesional y la ejecución impecable de estudios como Cactus. Pero nosotros diseñamos para personas reales: emprendedores que lanzan, marcas que crecen en redes sociales, empresas que necesitan moverse rápido y con estilo. Cada solución que construimos tiene un propósito: que tú vendas más y gestiones mejor.</p>
        </div>
      </section>

      {/* Para quién trabajamos */}
      <section className="section">
        <div className="container">
          <h2>Creamos soluciones para...</h2>
          <div className="cards">
            <div className="card">
              <h3>Creadores e influencers</h3>
              <p>Transforma tu comunidad en una plataforma propia que monetiza.</p>
            </div>
            
            <div className="card">
              <h3>Negocios locales y pymes</h3>
              <p>De WhatsApp a tu propia app. Moderniza tu operación y conquista clientes.</p>
            </div>
            
            <div className="card">
              <h3>Startups & scaleups</h3>
              <p>Lanza tu MVP, integra pagos, genera data. Nosotros desarrollamos, tú creces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="cta">
        <div className="container">
          <h2>¿Listo para lanzar tu app o plataforma?</h2>
          <a href="mailto:hola@elefantelab.com" className="btn-primary">Habla con nuestro equipo</a>
        </div>
      </section>
    </>
  )
}