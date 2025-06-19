export default function ComoTrabajamos() {
  return (
    <>
      {/* Header */}
      <section className="header">
        <div className="container">
          <h1>Cómo Trabajamos</h1>
          <p>Nuestro proceso probado para entregar resultados excepcionales</p>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="section">
        <div className="container">
          <h2>¿Cómo trabajamos?</h2>
          <div style={{display: 'grid', gap: '1.5rem', maxWidth: '800px', margin: '0 auto'}}>
            <div className="card" style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
              <div style={{
                width: '50px', 
                height: '50px', 
                backgroundColor: 'var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>1</div>
              <div>
                <strong>Entendemos tu idea:</strong> sesión de briefing claro y cercano.
              </div>
            </div>
            
            <div className="card" style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
              <div style={{
                width: '50px', 
                height: '50px', 
                backgroundColor: 'var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>2</div>
              <div>
                <strong>Prototipo funcional:</strong> demo ágil sin inversión grande.
              </div>
            </div>
            
            <div className="card" style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
              <div style={{
                width: '50px', 
                height: '50px', 
                backgroundColor: 'var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>3</div>
              <div>
                <strong>Desarrollo ágil:</strong> tecnología a medida, sin plantillas genéricas.
              </div>
            </div>
            
            <div className="card" style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
              <div style={{
                width: '50px', 
                height: '50px', 
                backgroundColor: 'var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>4</div>
              <div>
                <strong>Integración completa:</strong> CRM, ecommerce, APIs… todo conectado.
              </div>
            </div>
            
            <div className="card" style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
              <div style={{
                width: '50px', 
                height: '50px', 
                backgroundColor: 'var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>5</div>
              <div>
                <strong>Escalamos contigo:</strong> mejoras, soporte y nuevas herramientas.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Herramientas y Tecnologías */}
      <section className="section" style={{backgroundColor: 'var(--surface)'}}>
        <div className="container">
          <h2>Herramientas y Tecnologías</h2>
          <div className="cards">
            <div className="card">
              <h3>🎨 Diseño y UX/UI</h3>
              <ul>
                <li>Figma para diseño de interfaces</li>
                <li>Adobe Creative Suite</li>
                <li>Principle para prototipos interactivos</li>
                <li>Maze para testing de usabilidad</li>
                <li>Hotjar para análisis de comportamiento</li>
              </ul>
            </div>
            
            <div className="card">
              <h3>💻 Desarrollo Web</h3>
              <ul>
                <li>React.js, Vue.js, Angular</li>
                <li>Node.js, Python, PHP</li>
                <li>WordPress, Shopify, Webflow</li>
                <li>MongoDB, PostgreSQL, MySQL</li>
                <li>AWS, Google Cloud, Netlify</li>
              </ul>
            </div>
            
            <div className="card">
              <h3>📱 Marketing Digital</h3>
              <ul>
                <li>Google Analytics 4 y Google Ads</li>
                <li>Facebook Business Manager</li>
                <li>Mailchimp, Klaviyo para email marketing</li>
                <li>Hootsuite, Buffer para redes sociales</li>
                <li>SEMrush, Ahrefs para SEO</li>
              </ul>
            </div>
            
            <div className="card">
              <h3>🔧 Project Management</h3>
              <ul>
                <li>Notion para documentación</li>
                <li>Trello/Asana para gestión de proyectos</li>
                <li>Slack para comunicación</li>
                <li>GitHub para control de versiones</li>
                <li>Loom para videos explicativos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Principios de Trabajo */}
      <section className="section">
        <div className="container">
          <h2>Nuestros Principios</h2>
          <div className="cards">
            <div className="card">
              <h3>🤝 Transparencia Total</h3>
              <p>Mantenemos comunicación constante y transparente. Siempre sabrás en qué estamos trabajando, qué avances llevamos y qué viene después.</p>
            </div>
            
            <div className="card">
              <h3>📈 Enfoque en Resultados</h3>
              <p>Cada decisión que tomamos está orientada a generar resultados medibles para tu negocio. No hacemos cosas bonitas solo por ser bonitas.</p>
            </div>
            
            <div className="card">
              <h3>⚡ Agilidad y Flexibilidad</h3>
              <p>Trabajamos con metodologías ágiles que nos permiten adaptarnos rápidamente a cambios y entregar valor de forma continua.</p>
            </div>
            
            <div className="card">
              <h3>🎯 Orientación al Cliente</h3>
              <p>Tu éxito es nuestro éxito. Construimos soluciones pensando siempre en tus usuarios finales y en los objetivos de tu negocio.</p>
            </div>
            
            <div className="card">
              <h3>🚀 Innovación Constante</h3>
              <p>Nos mantenemos al día con las últimas tendencias y tecnologías para ofrecer siempre soluciones de vanguardia.</p>
            </div>
            
            <div className="card">
              <h3>📚 Transferencia de Conocimiento</h3>
              <p>No solo entregamos proyectos, también capacitamos a tu equipo para que puedan gestionar y hacer crecer la solución.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tiempos y Comunicación */}
      <section className="section" style={{backgroundColor: 'var(--surface)'}}>
        <div className="container">
          <h2>Comunicación y Seguimiento</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            <div className="card">
              <h3>📅 Reuniones Regulares</h3>
              <ul>
                <li><strong>Kickoff:</strong> Reunión inicial de alineación</li>
                <li><strong>Check-ins semanales:</strong> Status updates de 30 min</li>
                <li><strong>Presentaciones de avance:</strong> Cada milestone importante</li>
                <li><strong>Retrospectivas:</strong> Mejora continua del proceso</li>
              </ul>
            </div>
            
            <div className="card">
              <h3>💬 Canales de Comunicación</h3>
              <ul>
                <li><strong>Slack/WhatsApp:</strong> Comunicación diaria y rápida</li>
                <li><strong>Email:</strong> Comunicación formal y reportes</li>
                <li><strong>Videollamadas:</strong> Reuniones y presentaciones</li>
                <li><strong>Dashboard del proyecto:</strong> Acceso 24/7 al progreso</li>
              </ul>
            </div>
            
            <div className="card">
              <h3>📊 Reportes y Documentación</h3>
              <ul>
                <li><strong>Reportes semanales:</strong> Progreso y próximos pasos</li>
                <li><strong>Documentación técnica:</strong> Guías de uso y mantenimiento</li>
                <li><strong>Métricas de rendimiento:</strong> KPIs y analytics</li>
                <li><strong>Recomendaciones estratégicas:</strong> Insights para optimizar</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>¿Listo para trabajar con nosotros?</h2>
          <p>Nuestro proceso probado y nuestro equipo experto están listos para hacer realidad tu visión digital. Comencemos con una conversación.</p>
          <a href="mailto:hola@elefantelab.com" className="btn-primary">Iniciar Proyecto</a>
        </div>
      </section>
    </>
  )
}