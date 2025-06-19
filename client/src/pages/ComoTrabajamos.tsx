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

      {/* Metodología */}
      <section className="section">
        <div className="container">
          <h2>Nuestra Metodología</h2>
          <p style={{textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem'}}>
            En Elefante Lab seguimos un proceso estructurado que garantiza resultados excepcionales en cada proyecto. 
            Nuestro enfoque combina creatividad, estrategia y tecnología para crear soluciones que realmente funcionen.
          </p>
          
          <div className="cards">
            <div className="card">
              <h3>🔍 1. Descubrimiento y Análisis</h3>
              <h4>Duración: 1-2 semanas</h4>
              <p>Entendemos profundamente tu negocio, objetivos y audiencia.</p>
              <ul>
                <li><strong>Kick-off meeting:</strong> Sesión de alineación de objetivos</li>
                <li><strong>Análisis competitivo:</strong> Estudio del mercado y competencia</li>
                <li><strong>Definición de personas:</strong> Perfilado de audiencia objetivo</li>
                <li><strong>Auditoría digital:</strong> Revisión de presencia actual</li>
                <li><strong>Brief creativo:</strong> Documento de requisitos del proyecto</li>
              </ul>
              <div style={{backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '4px', marginTop: '1rem'}}>
                <strong>Entregable:</strong> Documento de descubrimiento y roadmap del proyecto
              </div>
            </div>
            
            <div className="card">
              <h3>🎯 2. Estrategia y Planificación</h3>
              <h4>Duración: 1-2 semanas</h4>
              <p>Desarrollamos la estrategia perfecta basada en datos y mejores prácticas.</p>
              <ul>
                <li><strong>Arquitectura de información:</strong> Estructura del proyecto</li>
                <li><strong>User journey mapping:</strong> Experiencia del usuario</li>
                <li><strong>Estrategia de contenidos:</strong> Plan editorial y messaging</li>
                <li><strong>Wireframes y prototipos:</strong> Bocetos funcionales</li>
                <li><strong>Plan de implementación:</strong> Cronograma detallado</li>
              </ul>
              <div style={{backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '4px', marginTop: '1rem'}}>
                <strong>Entregable:</strong> Estrategia completa y prototipos aprobados
              </div>
            </div>
            
            <div className="card">
              <h3>🎨 3. Diseño y Creatividad</h3>
              <h4>Duración: 2-4 semanas</h4>
              <p>Creamos la identidad visual y experiencia de usuario que cautiva.</p>
              <ul>
                <li><strong>Moodboard y concepto:</strong> Dirección visual del proyecto</li>
                <li><strong>Sistema de diseño:</strong> Guías de estilo y componentes</li>
                <li><strong>Diseños de alta fidelidad:</strong> Mockups finales</li>
                <li><strong>Responsive design:</strong> Adaptación a todos los dispositivos</li>
                <li><strong>Revisiones y ajustes:</strong> Refinamiento basado en feedback</li>
              </ul>
              <div style={{backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '4px', marginTop: '1rem'}}>
                <strong>Entregable:</strong> Diseños finales y sistema de diseño completo
              </div>
            </div>
            
            <div className="card">
              <h3>⚙️ 4. Desarrollo e Implementación</h3>
              <h4>Duración: 3-8 semanas</h4>
              <p>Convertimos los diseños en experiencias digitales funcionales y optimizadas.</p>
              <ul>
                <li><strong>Desarrollo frontend:</strong> Interfaces de usuario interactivas</li>
                <li><strong>Desarrollo backend:</strong> Funcionalidades y bases de datos</li>
                <li><strong>Integraciones:</strong> Conexión con herramientas externas</li>
                <li><strong>Testing y QA:</strong> Pruebas exhaustivas de funcionamiento</li>
                <li><strong>Optimización:</strong> Performance y SEO técnico</li>
              </ul>
              <div style={{backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '4px', marginTop: '1rem'}}>
                <strong>Entregable:</strong> Proyecto funcional en ambiente de pruebas
              </div>
            </div>
            
            <div className="card">
              <h3>🚀 5. Lanzamiento y Deploy</h3>
              <h4>Duración: 1 semana</h4>
              <p>Ponemos tu proyecto en vivo con todas las medidas de seguridad y monitoreo.</p>
              <ul>
                <li><strong>Configuración de servidores:</strong> Hosting y dominio</li>
                <li><strong>Migración de contenidos:</strong> Transferencia de datos</li>
                <li><strong>Testing en producción:</strong> Verificación final</li>
                <li><strong>Configuración de analytics:</strong> Herramientas de medición</li>
                <li><strong>Go-live:</strong> Lanzamiento oficial</li>
              </ul>
              <div style={{backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '4px', marginTop: '1rem'}}>
                <strong>Entregable:</strong> Proyecto live y documentación técnica
              </div>
            </div>
            
            <div className="card">
              <h3>📊 6. Monitoreo y Optimización</h3>
              <h4>Duración: Ongoing</h4>
              <p>Monitoreamos resultados y optimizamos continuamente para maximizar el rendimiento.</p>
              <ul>
                <li><strong>Análisis de métricas:</strong> Tracking de KPIs importantes</li>
                <li><strong>Reportes mensuales:</strong> Insights y recomendaciones</li>
                <li><strong>A/B testing:</strong> Optimización basada en datos</li>
                <li><strong>Actualizaciones:</strong> Mejoras continuas</li>
                <li><strong>Soporte técnico:</strong> Mantenimiento y resolución de issues</li>
              </ul>
              <div style={{backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '4px', marginTop: '1rem'}}>
                <strong>Entregable:</strong> Reportes mensuales y optimizaciones continuas
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