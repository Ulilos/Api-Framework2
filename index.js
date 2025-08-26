const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerOptions = require("./extend/swagger")


const app = express()
const port = 3000

const specs = swaggerJsdoc(swaggerOptions)

app.use(express.json())

/**
 * @swagger
 * components:
 *  schemas:
 *      Aluno:
 *          type: object
 *          require:
 *              - id
 *              - nome
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Identificador unico do aluno
 *              nome: 
 *                  type: string
 *                  description: Nome do aluno
 *          example:
 *              id: 1
 *              nome: fulano
 */

let alunos = [
    {id: 1, nome: "Enzo"}
]

/**
 * @swagger
 * /aluno: 
 *  get:
 *      summary: Retorna todos os alunos cadastrados
 *      tags: [Aluno]
 *      responses:
 *          200:
 *              descripton: Lista de Alunos
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Aluno'
 */
app.get('/aluno', (req, res) => {
    res.json(alunos)
})


/**
 * @swagger
 * /aluno: 
 *      post:
 *          summary: Criar um novo aluno
 *          tags: [Aluno]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              nome:
 *                                  type: string
 *          responses:
 *          201:
 *              descripton: Aluno criado
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Aluno'    
 *                         
 *                              
 */

app.post('/aluno', (req, res) => {
    const novoAluno = {id: alunos.length + 1, ...req.body}
    alunos.push(novoAluno)
    res.status(201).json(novoAluno)
})

app.put('/aluno/:id', (req,res) => {
    const { id } = req.params
    const alunoIndex = alunos.findIndex(a => a.id == id)

    
    if (alunoIndex > -1){
        alunos[alunoIndex] = {id: Number(id), ...req.body}
        
        res.status(200).json(alunos[alunoIndex])
    } else {
        res.status(404).json({ message: "Aluno não encontrado"})
    }
})

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(specs))

app.listen(port, ()=>{
    console.log("Servidor de API funcionando")
})