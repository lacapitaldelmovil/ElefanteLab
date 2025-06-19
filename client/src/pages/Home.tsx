

export default function Home() {
  return (
    <>
      {/* Header */}
      <section className="header">
        <div className="container">
          <h1>Transformamos ideas en software que escala negocios</h1>
          <p>Apps móviles y plataformas web diseñadas para emprendedores, pymes y compañías medianas</p>
          <a href="#contacto" className="btn-primary">Agendar llamada</a>
        </div>
      </section>

      {/* Líneas de Negocio */}
      <section className="section">
        <div className="container">
          <h2>Nuestras líneas de negocio</h2>
          <div className="cards">
            <div className="card">
              <h3>Apps móviles + plataformas web</h3>
              <p>Desarrollamos tu app sincronizada con ecommerce, CRM, LMS y sistemas internos.</p>
            </div>
            
            <div className="card">
              <h3>Plataformas SaaS & Multivendor</h3>
              <p>Marketplaces y herramientas online para escalar tu modelo de negocio.</p>
            </div>
            
            <div className="card">
              <h3>White Label & Automatización</h3>
              <p>Transformamos negocios tradicionales con automatismos y marca blanca.</p>
            </div>
            
            <div className="card">
              <h3>IA para UX, contenido y ventas</h3>
              <p>Asistentes inteligentes, generadores de contenido, personalización y más.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciador */}
      <section className="section" style={{backgroundColor: 'var(--surface)'}}>
        <div className="container">
          <h2>Diferenciador</h2>
          <p>Nos inspira la calidad de Cactus, pero vamos más allá adaptando cada solución a emprendedores y pymes, creando productos digitales no genéricos, sino pensados para crecer.</p>
        </div>
      </section>

      {/* A quién ayudamos */}
      <section className="section">
        <div className="container">
          <h2>¿A quién ayudamos?</h2>
          <div className="cards">
            <div className="card">
              <h3>Emprendedores</h3>
              <p>Llevamos tu idea a formato digital listo para vender.</p>
            </div>
            
            <div className="card">
              <h3>Negocios tradicionales</h3>
              <p>Digitalizamos y automatizamos tu operación diaria.</p>
            </div>
            
            <div className="card">
              <h3>Empresas medianas</h3>
              <p>Escalamos tus procesos con apps, IA, integración y automatización.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="cta">
        <div className="container">
          <h2>¿Listo para digitalizar y escalar tu negocio?</h2>
          <a href="mailto:hola@elefantelab.com" className="btn-primary">Contáctanos</a>
        </div>
      </section>
    </>
  )
}