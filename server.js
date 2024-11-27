// Importa o framework Express.js para criar a aplicação web
import express from "express";

import routes from "./src/routes/postsRoutes.js";

// Array de posts (dados fictícios para demonstração). Em uma aplicação real, esses dados seriam obtidos do banco de dados.
const posts = [
  {
    id: 1, 
    descricao: "uma foto",
    imagem: "https://placecats.com/millie/300/150"
  },
  {
    id: 2,
    descricao: "Um cachorro fofo",
    imagem: "https://place.dog/300/200"
  },
  {
    id: 3,
    descricao: "Uma bela paisagem natural",
    imagem: "https://source.unsplash.com/random/300x200/?nature"
  },
  {
    id: 4,
    descricao: "Um carro antigo",
    imagem: "https://source.unsplash.com/random/300x200/?car"
  },
  {
    id: 5,
    descricao: "Fotografia urbana",
    imagem: "https://unsplash.com/photos/s9rY4P6DncM"
  },
  {
    id: 6,
    descricao: "Selfie divertido",
    imagem: "https://placekitten.com/300/200"
  }
];

// Cria uma instância do Express e atribui à variável 'app' para representar a aplicação
const app = express();

// Configura a pasta uploads como uma pasta estática. Isso significa que os arquivos dentro dessa pasta (como as imagens) podem ser acessados diretamente pelo navegador usando seus URLs.
app.use(express.static("uploads"));

// Chama a função routes importada do módulo postsRoutes.js, passando a instância da aplicação app como argumento. Essa função irá registrar todas as rotas definidas no módulo postsRoutes.js na aplicação.
routes(app);

// Inicia o servidor na porta 3000 e imprime uma mensagem no console
app.listen(3000, () => {
  console.log('server echo');
});
