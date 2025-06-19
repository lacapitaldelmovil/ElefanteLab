export default function Servicios() {
  return (
    <>
      {/* Header */}
      <section className="header">
        <div className="container">
          <h1>Todo lo que necesitas para construir un producto digital... lo hacemos</h1>
        </div>
      </section>

      {/* Apps conectadas a plataformas */}
      <section className="section">
        <div className="container">
          <h2>Apps que sí venden (y sí se usan)</h2>
          <p>Desde ecommerce hasta comunidad cerrada o sistema de pedidos. Creamos apps que se conectan con lo que ya usas: WooCommerce, Shopify, sistemas de membresía, reservas, educación online y más.</p>
          <div style={{marginTop: '2rem'}}>
            <strong>Beneficios:</strong>
            <ul>
              <li>Android + iOS</li>
              <li>Notificaciones push</li>
              <li>Panel de control propio</li>
              <li>Automatización de pedidos y ventas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Plataformas SaaS y Multivendor */}
      <section className="section" style={{backgroundColor: 'var(--surface)'}}>
        <div className="container">
          <h2>Tu modelo de negocio, pero digital</h2>
          <p>¿Tienes un servicio o sistema que podrías vender a otros? Creamos SaaS y marketplaces desde cero, donde tú tienes el control.</p>
          <div style={{marginTop: '2rem'}}>
            <strong>Ideal para:</strong>
            <ul>
              <li>Educadores, agencias, consultores</li>
              <li>Tiendas colaborativas o marketplaces</li>
              <li>Startups de software</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Automatización y White Label */}
      <section className="section">
        <div className="container">
          <h2>Vende sin complicarte</h2>
          <p>Usa nuestras plataformas white label y enfócate en crecer. Personaliza con tu logo, colores y cobra desde el primer día. Ideal para agencias o marcas personales.</p>
          <div style={{marginTop: '2rem'}}>
            <strong>Beneficios:</strong>
            <ul>
              <li>Rápido de lanzar</li>
              <li>Sin desarrollo complejo</li>
              <li>Integración con Stripe, Mercado Pago, PayPal</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Inteligencia Artificial aplicada */}
      <section className="section" style={{backgroundColor: 'var(--surface)'}}>
        <div className="container">
          <h2>IA que trabaja por ti (de verdad)</h2>
          <p>No vendemos humo. Usamos IA para tareas reales: responder clientes, generar contenido, ordenar productos o predecir acciones. Todo con resultados medibles.</p>
        </div>
      </section>
    </>
  )
}