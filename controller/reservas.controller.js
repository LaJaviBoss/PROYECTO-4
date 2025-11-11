import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { nanoid } from 'nanoid'

// POST /api/reservas
export async function crearReserva(req, res) {
  try {
    const body = req.body

    // Validar que se hayan enviado los datos básicos
    const campos = [
      'hotel',
      'tipo_habitacion',
      'num_huespedes',
      'fecha_ingreso',
      'fecha_salida',
      'estado',
      'nombre_contacto',
      'email'
    ]
    for (const campo of campos) {
      if (!body[campo]) {
        return res.status(400).json({ error: `Falta el campo: ${campo}` })
      }
    }

    // Leer archivo de reservas
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const ruta = path.join(__dirname, '..', 'data', 'reservas.json')
    const raw = await fs.readFile(ruta, 'utf8')
    const reservas = JSON.parse(raw || '[]')

    // Crear nueva reserva
    const nueva = { id: nanoid(8), ...body }

    reservas.push(nueva)
    await fs.writeFile(ruta, JSON.stringify(reservas, null, 2))

    res.status(201).json(nueva)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear reserva' })
  }
}

// GET /api/reservas (con filtros)
export async function listarReservas(req, res) {
  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const ruta = path.join(__dirname, '..', 'data', 'reservas.json')
    const raw = await fs.readFile(ruta, 'utf8')
    let reservas = JSON.parse(raw || '[]')

    // 🔍 Obtener los filtros desde la URL
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query

    // 🏨 Filtrar por hotel
    if (hotel) {
      reservas = reservas.filter(r =>
        r.hotel.toLowerCase().includes(hotel.toLowerCase())
      )
    }

    // 📅 Filtrar por rango de fechas (fecha_ingreso dentro del rango)
    if (fecha_inicio && fecha_fin) {
      reservas = reservas.filter(r =>
        r.fecha_ingreso >= fecha_inicio && r.fecha_salida <= fecha_fin
      )
    }

    // 🛏️ Filtrar por tipo de habitación
    if (tipo_habitacion) {
      reservas = reservas.filter(r =>
        r.tipo_habitacion.toLowerCase() === tipo_habitacion.toLowerCase()
      )
    }

    // 💰 Filtrar por estado
    if (estado) {
      reservas = reservas.filter(r =>
        r.estado.toLowerCase() === estado.toLowerCase()
      )
    }

    // 👨‍👩‍👧 Filtrar por número de huéspedes
    if (num_huespedes) {
      reservas = reservas.filter(r =>
        Number(r.num_huespedes) === Number(num_huespedes)
      )
    }

    res.json(reservas)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al listar reservas' })
  }
}

// GET /api/reservas/:id
export async function obtenerReserva(req, res) {
  try {
    const { id } = req.params

    // Ruta al archivo de datos
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const ruta = path.join(__dirname, '..', 'data', 'reservas.json')

    // Leer y parsear el archivo
    const raw = await fs.readFile(ruta, 'utf8')
    const reservas = JSON.parse(raw || '[]')

    // Buscar la reserva por ID
    const encontrada = reservas.find(r => r.id === id)

    if (!encontrada) {
      return res.status(404).json({ error: 'Reserva no encontrada' })
    }

    // Enviar respuesta
    res.json(encontrada)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener reserva' })
  }
}

// PUT /api/reservas/:id
export async function actualizarReserva(req, res) {
  try {
    const { id } = req.params
    const datos = req.body

    // Ruta al archivo
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const ruta = path.join(__dirname, '..', 'data', 'reservas.json')

    // Leer y parsear el archivo
    const raw = await fs.readFile(ruta, 'utf8')
    const reservas = JSON.parse(raw || '[]')

    // Buscar reserva
    const index = reservas.findIndex(r => r.id === id)
    if (index === -1) {
      return res.status(404).json({ error: 'Reserva no encontrada' })
    }

    // Actualizar con los nuevos datos
    reservas[index] = { ...reservas[index], ...datos }

    // Guardar archivo
    await fs.writeFile(ruta, JSON.stringify(reservas, null, 2))

    res.json({ ok: true, reserva_actualizada: reservas[index] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar la reserva' })
  }
}

// DELETE /api/reservas/:id
export async function eliminarReserva(req, res) {
  try {
    const { id } = req.params

    // Ruta al archivo
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const ruta = path.join(__dirname, '..', 'data', 'reservas.json')

    // Leer archivo
    const raw = await fs.readFile(ruta, 'utf8')
    const reservas = JSON.parse(raw || '[]')

    // Buscar por id
    const index = reservas.findIndex(r => r.id === id)
    if (index === -1) {
      return res.status(404).json({ error: 'Reserva no encontrada' })
    }

    // Eliminar
    const eliminada = reservas.splice(index, 1)
    await fs.writeFile(ruta, JSON.stringify(reservas, null, 2))

    res.json({ ok: true, eliminada })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar reserva' })
  }
}
