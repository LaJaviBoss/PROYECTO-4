import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import path from 'path'
import { fileURLToPath } from 'url'
import reservasRouter from './routes/reservas.routes.js'

// 🧠 Cargar variables de entorno
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// 🧭 Rutas absolutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ⚙️ Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Reservas Hoteleras... HOTEL... TRIVAGO',
      version: '1.0.0',
      description:
        'API REST para gestionar reservas hoteleras. CRUD completo con filtros por hotel, fechas, tipo, estado y número de huéspedes.'
    },
    servers: [
      {
        url:
          process.env.SERVER_URL ||
          `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor local'
      }
    ]
  },
  apis: [`${path.join(__dirname, './routes/*.js')}`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

// 🧩 Rutas de la API
app.use('/api/reservas', reservasRouter)

// 🪶 Banner personalizado (aparece arriba del Swagger)
app.get('/banner', (req, res) => {
  res.send(`
    <link href="https://fonts.googleapis.com/css2?family=Quantico:wght@400;700&display=swap" rel="stylesheet">
    <div style="
      text-align:center;
      background:linear-gradient(90deg,#4a148c,#6a1b9a,#8e24aa);
      color:white;
      padding:30px;
      font-family:'Quantico',sans-serif;
      border-bottom: 4px solid #ff80ab;
    ">
      <h1 style="font-family:'Quantico',sans-serif; font-weight:700;">API de Reservas Hoteleras... HOTEL... TRIVAGO</h1>
      <p style="font-family:'Quantico',sans-serif;">Gestiona reservas, hoteles y huéspedes con estilo</p>
    </div>
  `)
})

// 🎨 Tema oscuro “Dark Fusion Edition 🌙” mejorado
app.use(
  '/',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, {
    customCssUrl: [
      // 👇 Cargamos Google Fonts (fuentes externas)
      'https://fonts.googleapis.com/css2?family=Quantico:wght@400;700&display=swap'
    ],
    customCss: `
      body { 
        background-color: #0a0a0f; 
        font-family: 'Quantico', sans-serif;
        color: #eaeaea;
        background-image: radial-gradient(circle at top left, #1e001f, #0a0a0f 60%);
      }

      .swagger-ui .topbar {
        background: linear-gradient(90deg, #6a1b9a, #ad1457);
        border-bottom: 3px solid #130142ff;
      }
.swagger-ui .info .title {
  font-family: 'Quantico', sans-serif !important;
  font-size: 3.5rem;
  font-weight: 700;
  color: #ff80ab;
  text-shadow: 0 0 10px #6a00ffff;
}


      .swagger-ui .opblock-summary {
        background-color: #1c1c24;
        border: 1px solid #6a1b9a;
        transition: all 0.3s ease-in-out;
      }

      .swagger-ui .opblock-summary:hover {
        transform: scale(1.01);
        background-color: #281b36;
        box-shadow: 0 0 12px #8e24aa;
      }

      .swagger-ui .btn {
        background-color: #8e24aa;
        border: none;
        color: white;
        border-radius: 8px;
        transition: 0.3s;
      }

      .swagger-ui .btn:hover {
        background-color: #d81b60;
        box-shadow: 0 0 10px #ff80ab;
      }

      /* Ajuste de las cajas GET, PUT, etc. */
      .opblock.opblock-get {
        border-color: #64b5f6;
      }

      .opblock.opblock-post {
        border-color: #81c784;
      }

      .opblock.opblock-put {
        border-color: #ffb74d;
      }

      .opblock.opblock-delete {
        border-color: #e57373;
      }

      .swagger-ui .opblock-tag {
        background: #1b0a10;
        border-radius: 4px;
        color: #ff8fb1;
        text-shadow: 0 0 8px #8e24aa;
      }

      .swagger-ui .info p {
        color: #c39facff;
        font-family: 'Quantico', sans-serif !important;
      }
    `,
    customSiteTitle: 'API de Reservas Hotel... TRIVAGO 🌙',
    customfavIcon: 'https://www.pngall.com/wp-content/uploads/5/Hotel-PNG-Photo.png'
  })
)

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
)