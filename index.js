const express = require('express');

const server = express();

//req: dados da requisição
//res: todas as informações de resposta da requisição

//Query params = ?teste=1
//Route params = /users/1
//Request body = {"name" : "marcelo"}

server.get('/users/:id',(req, res) =>{
  const nome = req.query.nome;
  const { id } = req.params;
  //return res.json({message: `Hello ${nome}`});
  return res.json({ message: `Buscando o usuário ${id}`});
})

server.listen(3000);