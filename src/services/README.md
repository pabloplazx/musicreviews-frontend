# services

Funciones que se comunican con el backend (llamadas a la API REST).
Cada archivo agrupa las llamadas de un recurso.

Ejemplos:
- albumService.js    → GET /api/albumes, GET /api/albumes/{id}, etc.
- authService.js     → POST /api/auth/login, POST /api/auth/register
- resenaService.js   → GET/POST/PUT/DELETE /api/resenas
- favoritoService.js → GET/POST/DELETE /api/favoritos
- artistaService.js  → GET /api/artistas
