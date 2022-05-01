///Import sqlite3 para abrir conexão com o banco de dados
import { rejects } from "assert";
import { query } from "express";
import { resolve } from "path";
import sqlite3  from "sqlite3";

const DATABASE_FILE = process.env.DATABASE_FILE;

if(!DATABASE_FILE) { ///Se não existir exibe a msg
    throw new Error('Database File não encontrado');
}
  
//https://www.youtube.com/watch?v=XaDMIXuqNY8

//Função para abrir conexao
export const openConnection = () => {
  let db = new sqlite3.Database(DATABASE_FILE);//sqlite3.Database(DATABASE_FILE);
  return db;
}

export const dbQuerySharedFirst = async (query: string, params?: any[]) => {
  const retornoDb = await dbQueryShared(query, params);
  return retornoDb[0];
}

//função para fazer query no banco
export const dbQueryShared = (query: string, params?: any[]) => {
  let db = openConnection();
  
  //Promise vai retornar um array de any[] para ser qualquer tipo e funcionar generico
  return new Promise<any[]>((resolve,rejects) => {

      db.all(query, params,(err,rows) => {
        if(err) {
            rejects(err);
        } else
        resolve(rows);
      });

  })
  .finally(()=>{
     db.close();
  });


}