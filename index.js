const express = require('express');

const server = express();

server.use(express.json()) //Permite que o express envie JSON no POST

//req: dados da requisição
//res: todas as informações de resposta da requisição

//Query params = ?teste=1
//Route params = /users/1
//Request body = {"name" : "marcelo"}

const users = ['Diego','Robson','Victor']

//Middlewares: faz alguma coisa entre as requisições HTTP
server.use((req,res,next)=>{
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`)
  
  next();

  console.timeEnd('Request');
})

//Verifica se tem a propriedade nome no corpo da requisição
function checkUserExists(req,res,next){
  if(!req.body.name){
    return res.status(400).json({erro: 'User name is required'});
  }

  return next();
}

//Verifica se existe usuário no array
function checkUserInArray(req,res,next){
  const user = users[req.params.index]

  if(!user){
    return res.status(400).json({erro: 'User does not exists'})
  }

  req.user = user; // Todos os middlewares que usam o checkInArray tem acesso
                   // a essa informação. 

  return next();
}


//Retorna todos os usuários
server.get('/users',(req,res)=>{
  return res.json(users)
})

//Pesquisa um usuário especifico
server.get('/users/:index',checkUserInArray,(req, res) =>{
  //const nome = req.query.nome;
  //const { index } = req.params;
  //return res.json({message: `Hello ${nome}`});
  return res.json(req.user);
})

//Cadastra um usuário
server.post('/users',checkUserExists, (req,res)=>{
  const {name} = req.body;

  users.push(name);

  return res.json(users);
})

//Edita um usuário
server.put('/users/:index',checkUserExists,checkUserInArray, (req,res)=>{
  const { index } = req.params; // pega o index na url da rota
  const { name } = req.body; //pega o nome no corpo da requisição

  users[index] = name;

  return res.json(users)
})

//Deleta um usuário
server.delete('/users/:index',checkUserInArray,(req,res) =>{
  const {index} = req.params;

  users.splice(index,1); //Deleta o usuário do array

  return res.send();

})


server.listen(3000);