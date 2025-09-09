const express = require('express')
const alunoController = require('../controllers/alunoController')
const authenticationToken = require('../middlewares/auth')

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Aluno:
 *          type: object
 *          required:
 *              - id
 *              - ra
 *              - nome
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Identificador unico do aluno
 *              nome:
 *                  type: string
 *                  description: Nome do aluno
 *              ra:
 *                  type: integer
 *                  description: Número da matrícula
 *          example:
 *              id: 1
 *              nome: Fulano
 *              ra: 123    
 */

/**
 * @swagger
 * /aluno:
 *  get:
 *      summary: Retorna todos os alunos
 *      tags: [Alunos]
 *      responses:
 *          200:
 *              description: Lista de alunos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Aluno'
 */
router.get('/', authenticationToken, alunoController.getAll.bind(alunoController))

/**
 * @swagger
 * /aluno:
 *  post:
 *      summary: Cadastros de aluno
 *      tags: [Alunos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nome:
 *                              type: string
 *                          ra:
 *                              type: integer
 *      responses:
 *          201:
 *              description: Cadastro de alunos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Aluno'
 */
router.post('/', authenticationToken, alunoController.create.bind(alunoController))

/**
 * @swagger
 * /aluno/{id}:
 *  put:
 *      summary: Atualização de aluno
 *      tags: [Alunos]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nome:
 *                              type: string
 *                          ra:
 *                              type: integer
 *      responses:
 *          200:
 *              description: Aluno atualizado
 *          404:
 *              description: Cara tem certeza que é esse id?               
 */
router.put('/:id', authenticationToken, alunoController.update.bind(alunoController))

module.exports = router