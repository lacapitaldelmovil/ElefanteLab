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
- **Servicios (/servicios)**: Catálogo completo de servicios con precios
- **Casos de Éxito (/casos)**: 5 casos de éxito detallados con métricas reales
- **Cómo Trabajamos (/como-trabajamos)**: Metodología de trabajo en 6 fases

### Design System
- **Color Palette**: 
  - Primary: #D32F2F (Red)
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
- June 19, 2025: Implementación completa del sitio web de Elefante Lab
  - Estructura React con TypeScript y Tailwind CSS
  - 4 páginas principales con contenido completo
  - 5 casos de éxito inventados con métricas detalladas
  - Servidor Express con Vite para desarrollo
  - Navegación funcional entre páginas
  - Diseño responsive y accesible