// http://localhost:8091/api/v1/products

import { Router } from "express";
import { productController } from "../controllers/productsController";

//Criando objeto rota para produto
const productRouter = Router();

//criando as rotas
productRouter.post('/', productController.insertProduct);
productRouter.get('/', productController.listAllProduct);
productRouter.get('/:id', productController.getProductById);
productRouter.delete('/:id', productController.deleteProductById);
productRouter.put('/:id', productController.updateProductById);


//exportando para ter acesso em outros pontos da aplicação
export {
  productRouter
}