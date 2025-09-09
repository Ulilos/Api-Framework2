const alunoRepo = require('../repositories/alunoRepo')

class AlunoService {
    async findAll() {
        return await alunoRepo.findAll()
    }

    async findById(id) {
        const aluno = await alunoRepo.findById(id)
        if (!aluno) {
            throw new Error('Cara tem certeza que é esse id?')
        }
        return aluno
    }

    async create(alunoData) {
        const { nome, ra } = alunoData
        
        if (!nome || !ra) {
            throw new Error('Nome e RA são obrigatórios')
        }

        return await alunoRepo.create(alunoData)
    }

    async update(id, alunoData) {
        const aluno = await alunoRepo.update(id, alunoData)
        if (!aluno) {
            throw new Error('Cara tem certeza que é esse id?')
        }
        return aluno
    }

    async delete(id) {
        const deleted = await alunoRepo.delete(id)
        if (!deleted) {
            throw new Error('Cara tem certeza que é esse id?')
        }
        return { message: 'Aluno removido com sucesso' }
    }
}

module.exports = new AlunoService()