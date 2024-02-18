//no nosso projeto aprendemos e ultilizamos as seguintes ferramentas

/*
- GET            => Busca informação no back-and
- POST           => Cria informação no back-and   
- PUT / PATCH    => Alterar/Atualizar informação no back-and
- DELETE         => Deletar informação no back-and

-Middleware   => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requesição

*/














const express = require('express')
const uuid = require('uuid') // biblioteca que cria ids diferentes para cada usuario
const port = 3000
const app = express()
app.use(express.json())

// Array para armazenar os usuários
const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    // Procura o índice do usuário no array com base no ID fornecido
    const index = users.findIndex(user => user.id === id)

    // Verifica se o usuário existe
    if (index < 0) {
        // Se não encontrar o usuário, retorna um erro 404 (Not Found)
        return response.status(404).json({ message: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

// Rota para buscar todos os usuários
app.get('/users', (request, response) => {
    return response.json(users)
})
// Rota para criar um novo usuário
app.post('/users', (request, response) => {
    const { name, age } = request.body

    // Cria um novo usuário com um ID único gerado usando o módulo uuid
    const user = { id: uuid.v4(), name, age }

    // Adiciona o novo usuário ao array de usuários
    users.push(user)

    // Retorna o usuário criado com o código de status 201 (Created)
    return response.status(201).json(user)
})
// Rota para atualizar um usuário existente
app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    // Cria um objeto com as informações atualizadas do usuário
    const updateUser = { id, name, age }



    // Atualiza o usuário no array de usuários
    users[index] = updateUser

    // Retorna o usuário atualizado
    return response.json(updateUser)
})
// Rota para deletar um usuário existente
app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
    users.splice(index, 1)

    return response.status(204).json(users)
})
// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
