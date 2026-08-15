# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### 2025-06-22
- **Initial project setup**: Created React app with PWA template, Docker support, PrimeReact, and project structure for a psychological clinic website
- **Docker build issues**: Fixed missing build script and dependencies in package.json that were causing build failures
- **Blank page issues**: Created proper index.html structure for Vite build process to resolve blank page display
- **404 errors on navigation**: Configured nginx to handle client-side routing with proper try_files directive for React Router
- **Double navigation**: Removed conflicting url properties from TabMenu items to prevent duplicate navigation when clicking tabs
- **Migration to Vite**: Switched from Create React App to Vite for improved performance and faster development experience
- **File structure updates**: Moved index.html to root directory (Vite standard) and migrated from .js to .jsx extensions for better Vite compatibility
- **Dependencies update**: Updated package.json with Vite and @vitejs/plugin-react, removed react-scripts
- **Nginx configuration**: Added custom nginx.conf for SPA routing support and proper static asset handling
- **Background images**: Updated navbar to use reliable Picsum Photos service instead of placeholder images
- **Build process**: Fixed Vite configuration and file structure for proper production builds
- **Development server**: Configured Vite dev server with hot module replacement, set to port 3000 for development, 80 for production
- **Static asset handling**: Added proper caching headers for CSS, JS, and image files
- **Static assets structure**: Created public/images directory for local background images and other static assets 