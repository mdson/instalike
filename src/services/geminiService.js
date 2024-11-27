import { GoogleGenerativeAI } from '@google/generative-ai';
// Importa a classe GoogleGenerativeAI do pacote @google/generative-ai, que será utilizada para interagir com a API do Google Generative AI.

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Cria uma nova instância do cliente GoogleGenerativeAI, utilizando a chave de API do Gemini armazenada na variável de ambiente GEMINI_API_KEY.

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
// Obtém o modelo de linguagem Gemini-1.5-flash, que será utilizado para gerar o texto descritivo da imagem.

export default async function gerarDescricaoComGemini(imageBuffer) {
  // Define uma função assíncrona para gerar uma descrição da imagem utilizando o modelo Gemini.

  const prompt = "Faça uma descrição detalhada em português do Brasil da seguinte imagem. Retorne somente a descrição da imagem.";
  // Cria um prompt de texto que instrui o modelo a gerar uma descrição detalhada da imagem em português brasileiro.

  try {
    // Bloco try-catch para tratar possíveis erros durante a geração da descrição.

    const image = {
      inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType: 'image/png',
      },
    };
    // Cria um objeto que representa a imagem, convertendo o buffer da imagem para uma string base64 e definindo o tipo MIME como PNG.

    const res = await model.generateContent([prompt, image]);
    // Envia o prompt e a imagem para o modelo e aguarda a resposta.

    return res.response.text() || 'Alt-text não disponível.';
    // Retorna o texto gerado pelo modelo como a descrição da imagem. Se ocorrer algum erro, retorna uma mensagem padrão.

  } catch (error) {
    // Caso ocorra algum erro durante a geração da descrição, imprime uma mensagem de erro no console e lança uma nova exceção.
    console.error('Erro ao obter alt-text:', error.message, error);
    throw new Error('Erro ao obter o alt-text do Gemini.');
  }
}
