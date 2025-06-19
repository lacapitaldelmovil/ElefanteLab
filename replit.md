# Elefante Lab - Web Design Project

## Overview
This repository contains a web design project for Elefante Lab, a digital agency website inspired by the Cactus design aesthetic. The project is in its initial setup phase with foundational CSS styling and documentation for a complete website build.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML/CSS/JavaScript (implied)
- **Design System**: CSS Custom Properties (CSS Variables) for consistent theming
- **Layout Strategy**: CSS Grid and Flexbox for responsive design
- **Component Approach**: Modular CSS classes for reusable UI components

### Styling Architecture
- **CSS Organization**: Shared base styles in `shared.css` with component-specific styling
- **Design Tokens**: CSS custom properties for colors, fonts, and spacing
- **Responsive Design**: Grid-based layout with `minmax()` for adaptive columns
- **Component Library**: Pre-defined button, card, and section styles

## Key Components

### Design System
- **Color Palette**: 
  - Primary: #D32F2F (Red)
  - Secondary: #1D3557 (Dark Blue)
  - Background: #FFFFFF (White)
  - Surface: #F6F6F6 (Light Gray)
  - Text: #1A1A1A (Dark Gray)
- **Typography**: Inter font family for clean, modern text
- **Component Classes**: 
  - `.btn-primary` for call-to-action buttons
  - `.card` for content cards with shadow effects
  - `.container` for consistent content width and padding

### Layout Components
- **Header**: Primary color background with centered white text
- **Footer**: Matches header styling for visual consistency
- **Sections**: Structured content areas with consistent spacing
- **Cards**: Grid-based layout for service/content presentation
- **CTA (Call-to-Action)**: Secondary color background for conversion focus

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

## Changelog
Changelog:
- June 19, 2025. Initial setup