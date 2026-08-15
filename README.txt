Guía rápida (frontend + API de ofertas)
=======================================

Entorno local: **Node.js 22+** y **pnpm 11** (por ejemplo `corepack enable && corepack prepare pnpm@11.1.1 --activate`). Instalación: `pnpm install`; desarrollo: `pnpm run dev`.

El frontend usa Vite/React y consume las ofertas de trabajo desde la API FastAPI en `GET /api/v1/job-offers`. Tanto el listado (`CareersJobBoard.jsx`) como el detalle (`CareersOfferDetails.jsx`) leen la URL base del backend desde la variable `VITE_API_BASE_URL`.

Variables de entorno (Vite)
---------------------------
- `.env.production` (para `pnpm run build` y Docker):
  ```
  VITE_API_BASE_URL=https://tu-backend-prod.tld
  ```


Build y producción (Docker)
---------------------------
- Opción rápida con docker compose (sirve el build estático con Nginx):
  ```bash
  # asegúrate de tener .env.production con la URL deseada
  docker compose up --build
  ```
  Publica el sitio en http://localhost:3000.

- Sin compose (manual):
  ```bash
  docker build -t psiclinic-web .
  docker run -p 3000:80 psiclinic-web
  ```

Cambiar entorno Dev/Prod
------------------------
- Ajusta `VITE_API_BASE_URL` en `.env.development` según corresponda.
- Para probar otro backend en un build Docker puntual:
  ```bash
  VITE_API_BASE_URL=https://otro-backend docker compose up --build
  ```

Notas
-----
- La API espera devolver `{ "data": [...] }`; los componentes usan ese formato.
- Si la API no responde, el listado y el detalle muestran mensajes de error/carga.
