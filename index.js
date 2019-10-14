const express = require('express');

const server = express();

//req: dados da requisição
//res: todas as informações de resposta da requisição

server.get('/teste',(req, res) =>{
  return res.json({message: 'Hello World'});
})

server.listen(3000);