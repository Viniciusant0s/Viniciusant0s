// Importa o framework Express para criar a aplicação do lado do servidor
import express from "express";

// Importa o middleware Multer para gerenciar uploads de arquivos
import multer from "multer";

// Importa funções controladoras do arquivo postsControllers.js 
// para lidar com a lógica relacionada a posts
import { listarpots, postarNovoPosts, uploadImagem, atualizarNovoPost } from "../controllers/postsControllers.js";
import cors from "cors";

const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento em disco para arquivos enviados usando o mecanismo diskStorage do Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para salvar os arquivos enviados
  destination: function (req, file, cb) {
    // Crie o diretório 'uploads' se ele não existir (opcional, considere tratamento de erros)
    // fs.mkdirSync('uploads', { recursive: true }); // Descomente se estiver usando o módulo fs

    // Passe null para sucesso e 'uploads/' para o diretório de destino
    cb(null, 'uploads/');
  },

  // Define o nome do arquivo para os arquivos enviados
  filename: function (req, file, cb) {
    // Use o nome original do arquivo para manter a familiaridade do usuário
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com o armazenamento configurado
const upload = multer({ storage });

// Define rotas para a aplicação Express
const routes = (app) => {
  // Habilita o analisador JSON para o Express, permitindo que ele interprete dados JSON no corpo da requisição
  app.use(express.json());
  app.use(cors(corsOptions))
  
  // Rota GET para recuperar uma lista de todos os posts (tratada pela função listarpots do controlador)
  app.get("/posts", listarpots);

  // Rota POST para criar um novo post (tratada pela função postarNovoPosts do controlador)
  app.post("/posts", postarNovoPosts);

  // Rota POST para enviar uma imagem (tratada pela função uploadImagem do controlador)
  // Esta rota espera um único arquivo nomeado "imagem" no corpo da requisição multipart/form-data
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes para ser usada no arquivo principal da aplicação
export default routes;