API de Reservas Hoteleras

Proyecto de backend desarrollado con Node.js y Express. Permite gestionar reservas de hoteles mediante operaciones CRUD (crear, leer, actualizar y eliminar), junto con filtros por hotel, fechas, tipo de habitación, estado y número de huéspedes. Incluye documentación interactiva con Swagger UI.
Tecnologías utilizadas


Node.js


Express


Swagger UI


Swagger JSDoc


Morgan


CORS


Dotenv


Estructura del proyecto

api-reservas-hoteles/
│
├── controller/
│   └── reservas.controller.js
│
├── data/
│   └── reservas.json
│
├── routes/
│   └── reservas.routes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js

Instalación


Clonar el repositorio o descargar el proyecto.


Instalar dependencias:
npm install



Crear un archivo .env en la raíz del proyecto con las siguientes variables:
PORT=3000
SERVER_URL=http://localhost:3000



Ejecutar el servidor en modo desarrollo:
npm run dev



| Método | Endpoint                                                     | Descripción                                  |
| ------ | ------------------------------------------------------------ | -------------------------------------------- |
| POST   | `/api/reservas`                                              | Crear una nueva reserva                      |
| GET    | `/api/reservas`                                              | Obtener todas las reservas o aplicar filtros |
| GET    | `/api/reservas/:id`                                          | Obtener una reserva por ID                   |
| PUT    | `/api/reservas/:id`                                          | Actualizar una reserva existente             |
| DELETE | `/api/reservas/:id`                                          | Eliminar una reserva                         |
| GET    | `/api/reservas?hotel=HOTEL`                                  | Filtrar por nombre de hotel                  |
| GET    | `/api/reservas?fecha_inicio=YYYY-MM-DD&fecha_fin=YYYY-MM-DD` | Filtrar por rango de fechas                  |
| GET    | `/api/reservas?tipo_habitacion=TIPO`                         | Filtrar por tipo de habitación               |
| GET    | `/api/reservas?estado=ESTADO`                                | Filtrar por estado                           |
| GET    | `/api/reservas?num_huespedes=CANTIDAD`                       | Filtrar por número de huéspedes              |


Documentación
La API incluye una interfaz Swagger disponible al iniciar el servidor:
http://localhost:3000

En esta interfaz se pueden ejecutar pruebas directamente sobre los endpoints.
Personalización de Swagger
El proyecto incluye un tema oscuro con personalización visual:


Gradientes en la barra superior.


Tipografía "Quantico" de Google Fonts.


Efectos de sombra en títulos y botones.


Autor
Desarrollado por Javiera Sepulveda N.
Proyecto para módulo Fullstack Bootcamp.
