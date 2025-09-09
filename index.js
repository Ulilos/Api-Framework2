const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerOptions = require("./extend/swagger")
const sequelize = require('./src/config/database')

const authRoutes = require('./src/routes/authRoutes')
const alunoRoutes = require('./src/routes/alunoRoutes')

const app = express()
const port = 3000

const specs = swaggerJsdoc(swaggerOptions)

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/aluno',alunoRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

sequelize.sync({force: false}).then(() => {
    app.listen(port, () => {
        console.log('servidor de API rodando')
    })
}).catch(err =>{
    console.log('erro no sync do banco: ', err)
})