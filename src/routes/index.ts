import { Application, Router } from "express";
import { productRouter } from "./productRoute";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    //declarar as routas dos outros recursos
    apiRouter.use('/products', productRouter);

    app.use('/api/v1', apiRouter);
}