import { ObjectId } from "mongodb";
// Importa a classe ObjectId do módulo mongodb, utilizada para manipular IDs de documentos no MongoDB.

import 'dotenv/config';
// Carrega as variáveis de ambiente definidas no arquivo .env, como a string de conexão com o banco de dados.

import conectarAoBanco from "../config/dbconfig.js";
// Importa a função 'conectarAoBanco' do arquivo 'dbconfig.js', responsável por estabelecer a conexão com o banco de dados.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Cria uma conexão com o banco de dados utilizando a string de conexão obtida das variáveis de ambiente. 
// A palavra-chave 'await' indica que a função 'conectarAoBanco' é assíncrona e aguarda a conclusão da conexão antes de continuar.

export async function getTodosOsPosts() {
    // Define uma função assíncrona para obter todos os posts do banco de dados.
    const db = conexao.db('bancoimersaoinstabyte');
    // Obtém o banco de dados com o nome 'bancoimersaoinstabyte' a partir da conexão estabelecida.
    const colecao = db.collection('posts');
    // Obtém a coleção 'posts' dentro do banco de dados.
    return colecao.find().toArray();
    // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados em um array.
}

export async function criarPost(novoPostCriar) {
    // Define uma função assíncrona para criar um novo post no banco de dados.
    const db = conexao.db('bancoimersaoinstabyte');
    // Obtém o banco de dados com o nome 'bancoimersaoinstabyte'.
    const colecao = db.collection('posts');
    // Obtém a coleção 'posts'.
    return colecao.insertOne(novoPostCriar);
    // Insere um novo documento (post) na coleção com os dados fornecidos em 'novoPostCriar'.
}

export async function atualizarPost(id, post) {
    // Define uma função assíncrona para atualizar um post existente no banco de dados.
    const db = conexao.db('bancoimersaoinstabyte');
    // Obtém o banco de dados.
    const colecao = db.collection('posts');
    // Obtém a coleção 'posts'.
    const objID = ObjectId.createFromHexString(id);
    // Converte o ID fornecido (em formato hexadecimal) para um objeto ObjectId do MongoDB.
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: post});
    // Atualiza um documento na coleção com o ID especificado. O operador '$set' substitui os campos existentes pelos novos valores fornecidos em 'post'.
}
