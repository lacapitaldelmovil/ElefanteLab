# Elefante Lab - Agencia Digital

## Overview  
Sitio web completo para Elefante Lab, una agencia digital especializada en diseño web, branding y marketing digital. El proyecto incluye páginas de inicio, servicios, casos de éxito y proceso de trabajo, implementado con React, TypeScript y Tailwind CSS.

## System Architecture

### Frontend Architecture
- **Technology Stack**: React 18, TypeScript, Tailwind CSS
- **Routing**: Wouter for client-side navigation
- **State Management**: React Query for server state
- **Build Tool**: Vite for development and production builds
- **Component Architecture**: Modular React components with TypeScript

### Backend Architecture
- **Server**: Express.js with Vite middleware
- **Development**: Hot reload with Vite dev server
- **Routing**: Express for API routes, Vite for frontend routing
- **Static Files**: Served through Vite in development

## Key Components

### Pages Implemented
- **Home (/)**: Página principal con servicios destacados y proceso de trabajo
- **Servicios (/servicios)**: Catálogo completo de servicios con enlaces a páginas detalladas
- **Casos de Éxito (/casos)**: 5 casos de éxito detallados con métricas reales
- **Cómo Trabajamos (/como-trabajamos)**: Metodología de trabajo en 6 fases
- **Apps Móviles (/apps-plataformas.html)**: Desarrollo de apps iOS/Android sincronizadas
- **SaaS & Multivendor (/saas-multivendor.html)**: Plataformas SaaS y marketplaces
- **White Label (/white-label.html)**: Soluciones listas con automatización
- **IA Aplicada (/inteligencia-artificial.html)**: Chatbots, contenido automático, ML
- **Por qué Nosotros (/porque-elefante.html)**: Diferenciadores y ventajas competitivas

### Design System
- **Color Palette**: 
  - Primary: #FF6B6B (Coral/Salmón)
  - Primary Gradient: Linear gradient coral to salmon
  - Secondary: #1D3557 (Dark Blue)
  - Background: #FFFFFF (White)
  - Surface: #F6F6F6 (Light Gray) 
  - Text: #1A1A1A (Dark Gray)
- **Typography**: Inter font family from Google Fonts
- **Components**: CSS custom properties con componentes React

## Data Flow
Currently static HTML/CSS structure with no dynamic data flow. The architecture supports future integration of:
- Content Management System
- Dynamic content loading
- Form submission handling
- API integrations for business services

## External Dependencies
- **Google Fonts**: Inter font family for typography
- **Future Considerations**: Potential integration with analytics, contact forms, and business management tools

## Deployment Strategy
- **Current State**: Static file deployment ready
- **Hosting Options**: Can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages)
- **Build Process**: No build step required for current CSS/HTML structure
- **Future Scaling**: Architecture supports progressive enhancement with JavaScript frameworks

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes
- June 19, 2025: Actualización final con textos definitivos de Elefante Lab
  - Textos literales del documento final implementados
  - Enfoque en "crecer rápido y con estilo" para emprendedores y marcas digitales
  - Headline principal: "Creamos apps y plataformas que hacen crecer tu negocio desde el primer clic"
  - Orientación específica a creadores, influencers, pymes y startups
  - Casos de éxito simplificados: Wellness360 (450 usuarios) y AgendaFit (2,000+ reservas)
  - Proceso de trabajo redefinido en 5 pasos claros
  - Actualización de color: Cambiado de rojo (#D32F2F) a coral/salmón (#FF6B6B) con gradientes
  - Creación de 4 páginas especializadas para líneas de negocio individuales
  - Enlaces desde página de servicios a páginas detalladas de cada especialidad
  - Página "Por qué Elefante Lab" agregada con diferenciadores clave
  - Integración de imágenes modernas en headers y elementos clave
  - Footer negro profesional con reconocimientos, newsletter y redes sociales
  - Imágenes estratégicas en proceso de trabajo y casos de éxito
  - Navegación actualizada en todas las páginas
  - Servidor funcionando correctamente en puerto 8080