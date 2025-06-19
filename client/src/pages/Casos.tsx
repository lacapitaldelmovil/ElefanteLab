export default function Casos() {
  return (
    <>
      {/* Header */}
      <section className="header">
        <div className="container">
          <h1>Historias reales, resultados concretos</h1>
        </div>
      </section>

      {/* Casos de éxito */}
      <section className="section">
        <div className="container">
          <div className="cards">
            
            {/* Caso 1: WELLNESS360 */}
            <div className="card">
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
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
                <h3 style={{margin: 0}}>WELLNESS360</h3>
              </div>
              
              <p><strong>Tipo de solución:</strong> App móvil + plataforma web de membresía</p>
              <p><strong>Cliente:</strong> Startup de salud con comunidad offline</p>
              <p><strong>Reto:</strong> Transformar sus clases y retos en un sistema digital</p>
              <p><strong>Solución:</strong> App Flutter + WordPress + WooCommerce + CRM</p>
              
              <div style={{marginTop: '1.5rem'}}>
                <p><strong>Resultados:</strong></p>
                <ul>
                  <li>+450 usuarios en el primer mes</li>
                  <li>70% menos soporte manual</li>
                  <li>100% de pagos automatizados</li>
                </ul>
              </div>
            </div>

            {/* Caso 2: AGENDAFIT */}
            <div className="card">
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
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
                <h3 style={{margin: 0}}>AGENDAFIT</h3>
              </div>
              
              <p><strong>Tipo de solución:</strong> SaaS White Label para entrenadores</p>
              <p><strong>Cliente:</strong> Agencia con más de 120 coaches</p>
              <p><strong>Reto:</strong> Cada coach necesitaba su propia agenda y landing</p>
              <p><strong>Solución:</strong> SaaS escalable con Laravel + Vue, personalizable por usuario</p>
              
              <div style={{marginTop: '1.5rem'}}>
                <p><strong>Resultados:</strong></p>
                <ul>
                  <li>2.000+ reservas en primer mes</li>
                  <li>Ingresos recurrentes para el cliente</li>
                  <li>Marca blanca adaptada a cada usuario</li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </section>


    </>
  )
}