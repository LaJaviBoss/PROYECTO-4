import express from 'express'
import {
  listarReservas,
  obtenerReserva,
  crearReserva,
  actualizarReserva,
  eliminarReserva
} from '../controller/reservas.controller.js'

const router = express.Router()

router.get('/', listarReservas)
router.get('/:id', obtenerReserva)
router.post('/', crearReserva)
router.put('/:id', actualizarReserva)
router.delete('/:id', eliminarReserva)

/**
 * @swagger
 * components:
 *  schemas:
 *    Reserva:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: ID único de la reserva
 *        hotel:
 *          type: string
 *          description: Nombre del hotel
 *        tipo_habitacion:
 *          type: string
 *          description: Tipo de habitación reservada
 *        fecha_ingreso:
 *          type: string
 *          format: date
 *        fecha_salida:
 *          type: string
 *          format: date
 *        num_huespedes:
 *          type: integer
 *        estado:
 *          type: string
 *          description: Estado de la reserva (pendiente, pagada, cancelada)
 */

/**
 * @swagger
 * /api/reservas:
 *  get:
 *    summary: Obtener todas las reservas o aplicar filtros
 *    tags: [Reservas]
 *    parameters:
 *      - in: query
 *        name: hotel
 *        schema:
 *          type: string
 *        description: Filtra por nombre del hotel
 *      - in: query
 *        name: tipo_habitacion
 *        schema:
 *          type: string
 *        description: Filtra por tipo de habitación
 *      - in: query
 *        name: estado
 *        schema:
 *          type: string
 *        description: Filtra por estado de la reserva
 *    responses:
 *      200:
 *        description: Lista de reservas
 */
router.get('/', listarReservas)

/**
 * @swagger
 * /api/reservas:
 *  post:
 *    summary: Crear una nueva reserva
 *    tags: [Reservas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reserva'
 *    responses:
 *      201:
 *        description: Reserva creada correctamente
 */
router.post('/', crearReserva)

/**
 * @swagger
 * /api/reservas/{id}:
 *  get:
 *    summary: Obtener una reserva por su ID
 *    tags: [Reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Reserva encontrada
 *      404:
 *        description: No se encontró la reserva
 */
router.get('/:id', obtenerReserva)

/**
 * @swagger
 * /api/reservas/{id}:
 *  put:
 *    summary: Actualizar una reserva existente
 *    tags: [Reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reserva'
 *    responses:
 *      200:
 *        description: Reserva actualizada correctamente
 */
router.put('/:id', actualizarReserva)

/**
 * @swagger
 * /api/reservas/{id}:
 *  delete:
 *    summary: Eliminar una reserva
 *    tags: [Reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Reserva eliminada correctamente
 */
router.delete('/:id', eliminarReserva)

export default router