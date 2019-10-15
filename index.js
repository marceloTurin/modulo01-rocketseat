const express = require('express');

const server = express();

//req: dados da requisição
//res: todas as informações de resposta da requisição

//Query params = ?teste=1
//Route params = /users/1
//Request body = {"name" : "marcelo"}

const users = ['Diego','Cláudio','Victor']

server.get('/users/:index',(req, res) =>{
  const nome = req.query.nome;
  const { index } = req.params;
  //return res.json({message: `Hello ${nome}`});
  return res.json(users[index]);
})

server.listen(3000);