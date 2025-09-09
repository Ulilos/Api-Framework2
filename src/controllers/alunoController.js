const alunoService = require('../services/alunoService')

class AlunoController {
    async getAll(req, res) {
        try {
            const alunos = await alunoService.findAll()
            res.json(alunos)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getById(req, res) {
        try {
            const aluno = await alunoService.findById(req.params.id)
            res.json(aluno)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    async create(req, res) {
        try {
            const aluno = await alunoService.create(req.body)
            res.status(201).json(aluno)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async update(req, res) {
        try {
            const aluno = await alunoService.update(req.params.id, req.body)
            res.json(aluno)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    async delete(req, res) {
        try {
            const result = await alunoService.delete(req.params.id)
            res.json(result)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}

module.exports = new AlunoController()