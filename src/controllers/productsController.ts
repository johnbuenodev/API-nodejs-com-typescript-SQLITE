//  22:41 parado o video  https://www.youtube.com/watch?v=XaDMIXuqNY8

// http://localhost:8091/api/v1/products
import express, {Request, Response} from 'express';
import { Product, productModel } from '../models/products';
import { utilsRecurso } from '../services/utils';

//export const insertProduct
const insertProduct = async (req: Request, res: Response) => {
  //18:01 parado muito bom
  // tem como deixar req.body.product; mas ai pega o json assim:
  /*
  {
      product: {
          "name": "teste",
          "valor": 111
      }
  }


  */
  const product = req.body;
  
  //Validando se tem os atributos do produto

  if(!product) {
      return utilsRecurso.BadRequest(res,"Produto inválido!");
  }

  if(!product.name) {
     return utilsRecurso.BadRequest(res, "Informe o nome do Produto!");
  }

  if(!product.quantity) {
      product.quantity = 0;
  }

  if(!product.price) {
    return utilsRecurso.BadRequest(res, "Informe o valor do Produto!");
  }

  /*
  if( !(parseFloat(product.price) > 0) ) { //Pode deixar somente o !product.price e tratar no front que o valor precisa ser number/float
    return utilsRecurso.BadRequest(res, "Informe o valor do produto");
  } */

  if(utilsRecurso.validateNumber(product.price) == false) { //Pode deixar somente o !product.price e tratar no front que o valor precisa ser number/float
    return utilsRecurso.BadRequest(res, "Informe o valor do produto!");
  }

  if(!product.category) {
    return utilsRecurso.BadRequest(res, "Informe a categoria do Produto!");
  }

  const newProduct = req.body as Product;
  productModel.insertProduct(newProduct)
  .then(/*id => {
    return res.json({
     id
    }); */
    product => {
      res.json(product);
    })
  .catch(err => utilsRecurso.internalServerError(res, err));

}

const listAllProduct = (req: Request, res: Response) => {
    
    productModel.listAllProduct()
    .then(products => {
      return res.json(products);
    })
    .catch(err => utilsRecurso.internalServerError(res, err));

}

const getProductById = (req: Request, res: Response) => {
    
    const idProduct = parseInt(req.params.id);
    if(utilsRecurso.validateNumber(idProduct) == false) {
      return utilsRecurso.BadRequest(res,'ID invalido!');
    }

    /*
    if(!idProduct) {
      return utilsRecurso.BadRequest(res, "Não foi informado ID Produto!");
    } */

    productModel.getProductById(idProduct)
    .then(product => {
        if(product) {
            return res.json(product);
        } else {
            return utilsRecurso.notFoundValue(res);
        }
     
    })
    .catch(err => utilsRecurso.internalServerError(res, err));

}

const deleteProductById = async (req: Request, res: Response) => {
    
  const idProduct = parseInt(req.params.id);
  if(utilsRecurso.validateNumber(idProduct) == false) {
    return utilsRecurso.BadRequest(res,'ID invalido!');
  }

  const prodVerifyExistenteDb = await productModel.getProductById(idProduct);
  if(!prodVerifyExistenteDb) {
    return utilsRecurso.notFoundValue(res);
  }

  productModel.deleteProductById(idProduct)
  .then(() => {
      utilsRecurso.processoOk(res);
  })
  .catch(err => utilsRecurso.internalServerError(res, err));

}

const updateProductById = async (req: Request, res: Response) => {
    
  const idProduct = parseInt(req.params.id);
  if(utilsRecurso.validateNumber(idProduct) == false) {
    return utilsRecurso.BadRequest(res,'ID invalido!');
  }

  const verifyProduct = req.body;

  if(!verifyProduct) {
      return utilsRecurso.BadRequest(res,"Produto inválido!");
  }

  if(!verifyProduct.name) {
     return utilsRecurso.BadRequest(res, "Informe o nome do Produto!");
  }

  if(!verifyProduct.price) {
    return utilsRecurso.BadRequest(res, "Informe o valor do Produto!");
  }

  if(utilsRecurso.validateNumber(verifyProduct.price) == false) { //Pode deixar somente o !product.price e tratar no front que o valor precisa ser number/float
    return utilsRecurso.BadRequest(res, "Informe o valor do produto!");
  }

  if(!verifyProduct.category) {
    return utilsRecurso.BadRequest(res, "Informe a categoria do Produto!");
  }

  const prodVerifyExistenteDb = await productModel.getProductById(verifyProduct.id);
  if(!prodVerifyExistenteDb) {
    return utilsRecurso.notFoundValue(res);
  }

  const updateProduct = req.body as Product;

  productModel.updateProductById(updateProduct)
  .then(() => {
      utilsRecurso.processoOk(res);
  })
  .catch(err => utilsRecurso.internalServerError(res, err));

}


export const productController = {
    insertProduct,
    listAllProduct,
    getProductById,
    deleteProductById,
    updateProductById
}