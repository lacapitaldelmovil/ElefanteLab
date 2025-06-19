export default function Casos() {
  return (
    <>
      {/* Header */}
      <section className="header">
        <div className="container">
          <h1>Casos de Éxito</h1>
          <p>Soluciones reales que han transformado negocios</p>
        </div>
      </section>

      {/* Casos de éxito */}
      <section className="section">
        <div className="container">
          <h2>Casos de éxito</h2>
          <div className="cards">
            
            {/* Caso 1: App móvil + plataforma web para comunidad */}
            <div className="card">
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                <div style={{
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: '#4CAF50',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>W</div>
                <h3 style={{margin: 0}}>Wellness360 – App móvil + plataforma web de membresía</h3>
              </div>
              <p><strong>Cliente:</strong> Startup de salud y bienestar con base en Barcelona.</p>
              <p><strong>Reto:</strong> Necesitaban transformar su comunidad offline en una plataforma digital con pagos, retos semanales y contenido exclusivo.</p>
              <p><strong>Solución:</strong> Creamos una app móvil en Flutter sincronizada con una plataforma web (WordPress + WooCommerce Subscriptions), integrada con pasarelas de pago y un CRM para la gestión de usuarios.</p>
              <p><strong>Resultados:</strong></p>
              <ul>
                <li>+450 usuarios suscritos el primer mes</li>
                <li>Reducción del 70% en la carga operativa</li>
                <li>Automatización de pagos, acceso a contenido y soporte</li>
              </ul>
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#e8f5e8',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}>
                <strong>Tecnologías:</strong> Flutter, WordPress, WooCommerce, Stripe, Firebase
              </div>
            </div>

            {/* Caso 2: SaaS white label para reservas */}
            <div className="card">
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                <div style={{
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: '#2196F3',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>AF</div>
                <h3 style={{margin: 0}}>AgendaFit – Plataforma SaaS de reservas para entrenadores personales</h3>
              </div>
              <p><strong>Cliente:</strong> Agencia que trabaja con más de 120 entrenadores independientes en LATAM.</p>
              <p><strong>Reto:</strong> Centralizar la gestión de clases, reservas y pagos en una herramienta que pudiera adaptarse a cada entrenador.</p>
              <p><strong>Solución:</strong> Desarrollamos un SaaS white label que permite a cada entrenador tener su propia landing, agenda y sistema de cobros. El sistema fue construido en Laravel + Vue.js con pagos Stripe.</p>
              <p><strong>Resultados:</strong></p>
              <ul>
                <li>Más de 2.000 reservas en el primer mes</li>
                <li>Cada entrenador puede personalizar su URL y branding</li>
                <li>El cliente monetiza mediante suscripciones al software</li>
              </ul>
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#e8f5e8',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}>
                <strong>Tecnologías:</strong> Laravel, Vue.js, Stripe, MySQL, API REST
              </div>
            </div>
            
          </div>
        </div>
      </section>


    </>
  )
}