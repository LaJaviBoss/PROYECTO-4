# API de Reservas Hoteleras

Proyecto backend desarrollado con **Node.js** y **Express**.  
Permite gestionar reservas hoteleras mediante operaciones CRUD (crear, leer, actualizar y eliminar), con filtros por hotel, fechas, tipo, estado y número de huéspedes.  
Incluye documentación interactiva con **Swagger UI**.

---

## Tecnologías utilizadas

- Node.js  
- Express  
- Swagger UI  
- Swagger JSDoc  
- Morgan  
- CORS  
- Dotenv  

---

## Instalación

1. Clonar el repositorio o descargar el proyecto.  
2. Instalar dependencias:  npm install
3.Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
PORT=3000
SERVER_URL=http://localhost:3000
4. Ejecutar el servidor: npm run dev
5. Abrir en el navegador:  http://localhost:3000  

---

## Endpoints principales

- **POST** `/api/reservas` → Crear una nueva reserva  
- **GET** `/api/reservas` → Obtener todas las reservas  
- **GET** `/api/reservas/:id` → Obtener una reserva por ID  
- **PUT** `/api/reservas/:id` → Actualizar una reserva  
- **DELETE** `/api/reservas/:id` → Eliminar una reserva  

---

## Documentación

Swagger UI disponible en:

http://localhost:3000

---

## Autor

Desarrollado por **Javiera Sepúlveda N.**  
Proyecto para módulo **Fullstack Bootcamp**.

