import {Response} from 'express';

//export const BadRequest
const BadRequest = (res: Response, err: string) => {
  res.status(400).json({err:err});
}

//export const internalServerError
const internalServerError = (res: Response, err: Error) => {
  res.status(500).json({err:err.message});
}

//Validar numero
const validateNumber = (numberValue: any) => { 
  if(parseFloat(numberValue) > 0) {
    return true;
  } else {
    return false;
  }
}

const notFoundValue = (res: Response) => {
  //Aqui só envia o status porque não foi encontrado a informação
  res.sendStatus(404);
}

const processoOk = (res: Response) => { res.sendStatus(200); }

export const utilsRecurso = {
  BadRequest,
  internalServerError,
  validateNumber,
  notFoundValue,
  processoOk
}