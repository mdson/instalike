import fs from "fs";
// Importa o módulo 'fs' do Node.js, responsável por interagir com o sistema de arquivos, permitindo a leitura e escrita de arquivos.

import { getTodosOsPosts, criarPost, atualizarPost } from "../models/postsModel.js";
// Importa funções do arquivo 'postsModel.js' que interagem com o banco de dados:
// - getTodosOsPosts: Recupera todos os posts armazenados no banco de dados.
// - criarPost: Insere um novo post no banco de dados.
// - atualizarPost: Atualiza um post existente no banco de dados.

import gerarDescricaoComGemini from "../services/geminiService.js";
// Importa a função 'gerarDescricaoComGemini' do arquivo 'geminiService.js', que provavelmente utiliza um modelo de linguagem como o Gemini para gerar descrições de imagens com base em seus conteúdos.

// Rota para listar todos os posts
export async function listarTodosOsPosts(req, res) {
  // Obtém todos os posts do banco de dados
  const posts = await getTodosOsPosts();

  // Envia uma resposta HTTP com status 200 (sucesso) e os posts em formato JSON
  res.status(200).json(posts);
}

// Rota para criar um novo post
export async function criarNovoPost(req, res) {
  // Obtém os dados do novo post enviados no corpo da requisição
  const novoPost = req.body;

  try {
    // Tenta criar o novo post
    const postCriado = await criarPost(novoPost);

    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado
    res.status(200).json(postCriado);
  } catch (error) {
    // Caso ocorra algum erro durante a criação do post
    console.error(error.message); // Imprime a mensagem de erro no console
    res.status(500).json({ erro: 'Falha ao criar o post' }); // Envia uma resposta de erro
  }
}

export async function uploadImagem(req, res) {
  // Cria um novo objeto para representar o post a ser criado
  const novoPost = {
    // Inicializa a descrição do post como uma string vazia
    descricao: "",
    // Define a URL da imagem como o nome original do arquivo enviado na requisição
    imgUrl: req.file.originalname,
    // Inicializa o atributo alt da imagem como uma string vazia
    alt: ""
  };

  // Tenta executar as operações de criação do post e tratamento da imagem
  try {
    // Chama a função para criar um novo post no banco de dados com os dados do novoPost
    const postCriado = await criarPost(novoPost);

    // Constrói o novo caminho completo para a imagem, utilizando o ID do post recém-criado
    const imgAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Move o arquivo da imagem para o novo local com o nome atualizado
    fs.renameSync(req.file.path, imgAtualizada);

    // Atualiza a URL da imagem no objeto do post com o novo caminho
    postCriado.imgUrl = imgAtualizada;

    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado como JSON
    res.status(200).json(postCriado);
  } catch (error) {
    // Caso ocorra algum erro durante o processo, captura o erro e envia uma resposta de erro
    console.error(error.message);
    res.status(500).json({'Erro:':'Falha no envio da requisição'});
  }
}

export async function atualizarNovoPost(req, res) {
  // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição
  const id = req.params.id;
  // Constrói a URL completa da imagem com base no ID do post
  const urlImg = `http://localhost:3000/${id}.png`;

  // Tenta executar as operações de atualização do post e tratamento da imagem
  try {
    // Lê o conteúdo da imagem do sistema de arquivos
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);

    // Gera uma descrição para a imagem usando o serviço Gemini
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    // Cria um objeto com os dados atualizados do post
    const postAtt = {
      // Atualiza a URL da imagem
      imgUrl: urlImg,
      // Atualiza a descrição da imagem
      descricao: descricao,
      // Atualiza o atributo alt da imagem (se fornecido na requisição)
      alt: req.body.alt
    };

    // Chama a função para atualizar o post no banco de dados com os novos dados
    const postCriado = await atualizarPost(id, postAtt);

    // Envia uma resposta HTTP com status 200 (sucesso) e o post atualizado como JSON
    res.status(200).json(postCriado);
  } catch (error) {
    // Caso ocorra algum erro durante o processo, captura o erro e envia uma resposta de erro
    console.error(error.message);
    res.status(500).json({'Erro:':'Falha no envio da requisição'});
  }
}