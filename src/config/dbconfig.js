import { MongoClient } from 'mongodb';

// Importa a classe MongoClient do pacote mongodb. Essa classe é responsável por gerenciar a conexão com o banco de dados MongoDB.

export default async function conectarAoBanco(stringConexao) {
  // Define uma função assíncrona chamada conectarAoBanco que recebe a string de conexão como parâmetro.
  // A palavra-chave 'async' indica que a função pode conter operações assíncronas, como a conexão com o banco de dados.
  // A palavra-chave 'export default' torna essa função o valor padrão para exportar deste módulo, permitindo que ela seja importada em outros arquivos.

  let mongoClient;
  // Declara uma variável para armazenar a instância do cliente MongoDB, que será utilizada para realizar as operações no banco de dados.

  try {
    // Bloco try-catch para tratar possíveis erros durante a conexão.

    mongoClient = new MongoClient(stringConexao);
    // Cria uma nova instância do cliente MongoDB, passando a string de conexão como argumento. Essa string contém as informações necessárias para conectar ao banco de dados, como o endereço do servidor, nome do banco de dados e credenciais de autenticação.

    console.log('Conectando ao cluster do banco de dados...');
    // Imprime uma mensagem no console para indicar que a conexão com o banco de dados está sendo estabelecida.

    await mongoClient.connect();
    // Espera a conclusão da operação de conexão com o banco de dados. A palavra-chave 'await' é utilizada para pausar a execução da função até que a promessa retornada por mongoClient.connect() seja resolvida.

    console.log('Conectado ao MongoDB Atlas com sucesso!');
    // Imprime uma mensagem no console para indicar que a conexão com o banco de dados foi estabelecida com sucesso.

    return mongoClient;
    // Retorna a instância do cliente MongoDB para que possa ser utilizada em outras partes do código para realizar operações no banco de dados.

  } catch (erro) {
    // Bloco catch para tratar os erros que podem ocorrer durante a conexão.
    console.error('Falha na conexão com o banco!', erro);
    // Imprime uma mensagem de erro no console, indicando que ocorreu um problema durante a conexão e exibindo o objeto de erro para facilitar a depuração.

    process.exit();
    // Encerra a execução do processo, pois não é possível continuar a execução do aplicativo sem uma conexão válida com o banco de dados.
  }
}