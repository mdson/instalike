// Importa o express para criar a aplicação web
import express from "express";

// Importa o multer para lidar com uploads de arquivos
import multer from "multer";

// Importa o cors para permitir requisições de origens diferentes
import cors from "cors";

// Importa as funções controladoras de posts de outro arquivo
import { listarTodosOsPosts, criarNovoPost, uploadImagem, atualizarNovoPost } from "../controller/postsController.js";

// Define as configurações do cors para permitir requisições da porta 8000
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Define o armazenamento para os uploads, salvando na pasta 'uploads/'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 1 
  }
});
 
// Cria a instância do multer com o armazenamento configurado
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o parseamento de dados JSON na requisição
  app.use(express.json());

  // Aplica o middleware do cors com as configurações definidas
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts (provavelmente usando listarTodosOsPosts)
  app.get('/posts', listarTodosOsPosts);

  // Rota POST para criar um novo post (provavelmente usando criarNovoPost)
  app.post('/posts', criarNovoPost);

  // Rota POST para upload de imagem (provavelmente usando uploadImagem)
  // O middleware 'upload.single('imagem')' trata o upload do arquivo 'imagem'
  app.post('/upload', upload.single('imagem'), uploadImagem);

  // Rota PUT para atualizar um post (provavelmente usando atualizarNovoPost)
  // O parâmetro ':id' na rota captura o ID do post a ser atualizado
  app.put('/upload/:id', atualizarNovoPost);
};

// Exporta a função 'routes' para ser usada em outro arquivo
export default routes;
