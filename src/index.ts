//Importar dotenv antes de todos os imports
import dotenv from 'dotenv';
dotenv.config();

import express, {Request, Response} from 'express';
import cors from 'cors'
import { useRoutes } from './routes';
import bodyParser from 'body-parser';
//Importar o Request e Response para ele reconhecer

const PORT = process.env.PORT || 8091;

const app = express();

//Cors

/*

https://www.twilio.com
  ^       ^
  |       |
scheme hostname


http://localhost:5000
  ^       ^       ^
  |       |       |
scheme hostname  port


Access-Control-Allow-Origin : *

Access-Control-Allow-Origin : https://www.twilio.com


//Criando um options para o Cors
const allowedOrigins = ['http://localhost:3000'];

const allowedOrigins = ['*'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

ou somente sem o options

app.use(cors);

*/

const allowedOrigins = ['*'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

//Passar o body-parser.json() para tratar os dados json que vem das chamadas dos endpoint//requisições
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));





useRoutes(app);

app.get('/',(req: Request,res: Response) => {
  res.json({
    message: 'Api-V1',
  });
});

app.listen(PORT, () => console.log('Servidor rodando na Porta: ' + PORT));
