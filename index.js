const express = require('express');

const server = express();

server.use(express.json()) //Permite que o express envie JSON no POST

//req: dados da requisição
//res: todas as informações de resposta da requisição

//Query params = ?teste=1
//Route params = /users/1
//Request body = {"name" : "marcelo"}

const users = ['Diego','Robson','Victor']


//Retorna todos os usuários
server.get('/users',(req,res)=>{
  return res.json(users)
})

//Pesquisa um usuário especifico
server.get('/users/:index',(req, res) =>{
  const nome = req.query.nome;
  const { index } = req.params;
  //return res.json({message: `Hello ${nome}`});
  return res.json(users[index]);
})

//Cadastra um usuário
server.post('/users',(req,res)=>{
  const {name} = req.body;

  users.push(name)

  return res.json(users);
})

//Edita um usuário
server.put('/users/:index',(req,res)=>{
  const { index } = req.params; // pega o index na url da rota
  const { name } = req.body; //pega o nome no corpo da requisição

  users[index] = name;

  return res.json(users)
})

//Altera um usuário
server.delete('/users/:index',(req,res) =>{
  const {index} = req.params;

  users.splice(index,1); //Deleta o usuário do array

  return res.send();

})


server.listen(3000);