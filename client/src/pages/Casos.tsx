export default function Casos() {
  return (
    <>
      {/* Header */}
      <section className="header">
        <div className="container">
          <h1>Casos de Éxito</h1>
          <p>Proyectos reales que han transformado negocios</p>
        </div>
      </section>

      {/* Caso 1: Restaurante Don Julio */}
      <section className="section">
        <div className="container">
          <div className="card" style={{marginBottom: '3rem'}}>
            <h2>🍽️ Restaurante Don Julio - Transformación Digital</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center'}}>
              <div>
                <h3>El Desafío</h3>
                <p>Don Julio, un restaurante familiar con 15 años de tradición, necesitaba modernizar su presencia digital para competir con las grandes cadenas y aumentar sus ventas durante la pandemia.</p>
                
                <h3>La Solución</h3>
                <ul>
                  <li>Diseño web responsive con menú digital interactivo</li>
                  <li>Sistema de reservas online integrado</li>
                  <li>Plataforma de delivery y pickup</li>
                  <li>Estrategia de redes sociales enfocada en foodie content</li>
                  <li>Campañas de Google Ads locales</li>
                </ul>
              </div>
              <div style={{backgroundColor: '#f8f8f8', padding: '2rem', borderRadius: '8px'}}>
                <h3>Resultados Obtenidos</h3>
                <div style={{display: 'grid', gap: '1rem'}}>
                  <div><strong>+150%</strong> Aumento en reservas online</div>
                  <div><strong>+200%</strong> Pedidos de delivery</div>
                  <div><strong>+85%</strong> Seguidores en Instagram</div>
                  <div><strong>+40%</strong> Ingresos totales en 6 meses</div>
                  <div><strong>4.8/5</strong> Rating promedio en Google</div>
                </div>
                <p><em>"Elefante Lab nos ayudó a reinventarnos digitalmente. Ahora somos el restaurante más buscado de la zona."</em></p>
                <strong>- María González, Propietaria</strong>
              </div>
            </div>
            <div style={{marginTop: '2rem'}}>
              <strong>Tecnologías utilizadas:</strong> WordPress, WooCommerce, OpenTable API, Google Analytics, Facebook Pixel
            </div>
          </div>
        </div>
      </section>

      {/* Caso 2: Clínica Dental Sonrisa */}
      <section className="section" style={{backgroundColor: 'var(--surface)'}}>
        <div className="container">
          <div className="card" style={{marginBottom: '3rem'}}>
            <h2>🦷 Clínica Dental Sonrisa - Generación de Leads</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center'}}>
              <div>
                <h3>El Desafío</h3>
                <p>La Clínica Dental Sonrisa necesitaba atraer más pacientes jóvenes y posicionarse como la opción moderna y tecnológica en su ciudad.</p>
                
                <h3>La Solución</h3>
                <ul>
                  <li>Rebranding completo con identidad visual moderna</li>
                  <li>Sitio web optimizado para conversión</li>
                  <li>Sistema de citas online 24/7</li>
                  <li>Campañas de Facebook e Instagram Ads</li>
                  <li>Content marketing sobre salud dental</li>
                  <li>Email marketing para seguimiento de pacientes</li>
                </ul>
              </div>
              <div style={{backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                <h3>Resultados Obtenidos</h3>
                <div style={{display: 'grid', gap: '1rem'}}>
                  <div><strong>+300%</strong> Citas agendadas online</div>
                  <div><strong>+180%</strong> Pacientes nuevos por mes</div>
                  <div><strong>+120%</strong> Engagement en redes sociales</div>
                  <div><strong>-50%</strong> Costo por lead adquirido</div>
                  <div><strong>+60%</strong> Retención de pacientes</div>
                </div>
                <p><em>"La transformación ha sido increíble. Ahora los pacientes nos encuentran fácilmente y confían en nosotros desde el primer contacto."</em></p>
                <strong>- Dr. Roberto Martínez, Director</strong>
              </div>
            </div>
            <div style={{marginTop: '2rem'}}>
              <strong>Tecnologías utilizadas:</strong> React, Node.js, Calendly API, Mailchimp, Google Ads, Facebook Business Manager
            </div>
          </div>
        </div>
      </section>

      {/* Caso 3: E-commerce Moda Urbana */}
      <section className="section">
        <div className="container">
          <div className="card" style={{marginBottom: '3rem'}}>
            <h2>👕 Moda Urbana - E-commerce Exitoso</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center'}}>
              <div>
                <h3>El Desafío</h3>
                <p>Una marca de ropa urbana local necesitaba expandirse al mercado online y competir con grandes retailers internacionales.</p>
                
                <h3>La Solución</h3>
                <ul>
                  <li>E-commerce completo con experiencia de usuario premium</li>
                  <li>Integración con sistemas de inventario</li>
                  <li>Múltiples métodos de pago y envío</li>
                  <li>Estrategia de marketing omnicanal</li>
                  <li>Programa de fidelización de clientes</li>
                  <li>Remarketing avanzado</li>
                </ul>
              </div>
              <div style={{backgroundColor: '#f8f8f8', padding: '2rem', borderRadius: '8px'}}>
                <h3>Resultados Obtenidos</h3>
                <div style={{display: 'grid', gap: '1rem'}}>
                  <div><strong>+400%</strong> Ventas online en el primer año</div>
                  <div><strong>+250%</strong> Carrito promedio de compra</div>
                  <div><strong>+90%</strong> Tasa de conversión</div>
                  <div><strong>+200%</strong> Clientes recurrentes</div>
                  <div><strong>35%</strong> Del total de ventas ahora son online</div>
                </div>
                <p><em>"Elefante Lab no solo nos creó una tienda online, sino que nos ayudó a entender el negocio digital. Ahora vendemos más online que en tienda física."</em></p>
                <strong>- Ana Jiménez, Fundadora</strong>
              </div>
            </div>
            <div style={{marginTop: '2rem'}}>
              <strong>Tecnologías utilizadas:</strong> Shopify Plus, Klaviyo, Google Analytics 4, Facebook Pixel, Zapier, POS Integration
            </div>
          </div>
        </div>
      </section>

      {/* Caso 4: Despacho de Abogados */}
      <section className="section" style={{backgroundColor: 'var(--surface)'}}>
        <div className="container">
          <div className="card" style={{marginBottom: '3rem'}}>
            <h2>⚖️ Bufete Jurídico Asociados - Presencia Profesional</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center'}}>
              <div>
                <h3>El Desafío</h3>
                <p>Un prestigioso despacho de abogados necesitaba modernizar su imagen y atraer clientes empresariales de alto valor.</p>
                
                <h3>La Solución</h3>
                <ul>
                  <li>Rebranding corporativo profesional</li>
                  <li>Sitio web institucional con casos de éxito</li>
                  <li>Portal de clientes para seguimiento de casos</li>
                  <li>Content marketing especializado en derecho corporativo</li>
                  <li>LinkedIn Ads para ejecutivos</li>
                  <li>SEO especializado en términos legales</li>
                </ul>
              </div>
              <div style={{backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                <h3>Resultados Obtenidos</h3>
                <div style={{display: 'grid', gap: '1rem'}}>
                  <div><strong>+160%</strong> Consultas de empresas grandes</div>
                  <div><strong>+80%</strong> Valor promedio por cliente</div>
                  <div><strong>+220%</strong> Tráfico web orgánico</div>
                  <div><strong>+150%</strong> Tiempo de permanencia en el sitio</div>
                  <div><strong>Top 3</strong> En búsquedas legales locales</div>
                </div>
                <p><em>"Nuestra nueva presencia digital refleja la calidad de nuestros servicios. Ahora las grandes empresas nos buscan directamente."</em></p>
                <strong>- Lic. Fernando Ruiz, Socio Director</strong>
              </div>
            </div>
            <div style={{marginTop: '2rem'}}>
              <strong>Tecnologías utilizadas:</strong> WordPress, Custom CRM, LinkedIn API, Google My Business, Schema Markup, SSL Enterprise
            </div>
          </div>
        </div>
      </section>

      {/* Caso 5: Startup Fintech */}
      <section className="section">
        <div className="container">
          <div className="card" style={{marginBottom: '3rem'}}>
            <h2>💳 FinPay - Lanzamiento de Startup Fintech</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center'}}>
              <div>
                <h3>El Desafío</h3>
                <p>Una startup fintech necesitaba lanzar su aplicación de pagos digitales y captar los primeros 10,000 usuarios en 3 meses.</p>
                
                <h3>La Solución</h3>
                <ul>
                  <li>Branding tech completo desde cero</li>
                  <li>Landing page optimizada para conversión</li>
                  <li>Campaña de pre-lanzamiento viral</li>
                  <li>Estrategia de growth hacking</li>
                  <li>Influencer marketing con fintechs</li>
                  <li>PR digital y relaciones públicas</li>
                </ul>
              </div>
              <div style={{backgroundColor: '#f8f8f8', padding: '2rem', borderRadius: '8px'}}>
                <h3>Resultados Obtenidos</h3>
                <div style={{display: 'grid', gap: '1rem'}}>
                  <div><strong>15,000</strong> Usuarios registrados en 3 meses</div>
                  <div><strong>+500%</strong> Meta de descargas superada</div>
                  <div><strong>+300%</strong> Menciones en medios especializados</div>
                  <div><strong>$2M USD</strong> Ronda de inversión conseguida</div>
                  <div><strong>4.9/5</strong> Rating en App Store</div>
                </div>
                <p><em>"Elefante Lab entendió perfectamente nuestra visión tech. Su estrategia nos ayudó a conseguir inversionistas y usuarios desde el día uno."</em></p>
                <strong>- Carlos Mendoza, CEO & Founder</strong>
              </div>
            </div>
            <div style={{marginTop: '2rem'}}>
              <strong>Tecnologías utilizadas:</strong> Vue.js, Firebase, Mixpanel, Intercom, App Store Optimization, Product Hunt
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>¿Tu proyecto podría ser el próximo caso de éxito?</h2>
          <p>Cada historia exitosa comenzó con una conversación. Platiquemos sobre tu proyecto y veamos cómo podemos ayudarte a lograr resultados extraordinarios.</p>
          <a href="mailto:hola@elefantelab.com" className="btn-primary">Iniciar Mi Proyecto</a>
        </div>
      </section>
    </>
  )
}