import { dbQueryShared, dbQuerySharedFirst } from "../services/dbService"

export type Product = {
    id: number,
    name: string,
    price: number,
    quantity: number,
    category: string,
}

//Add o async e await pois vai ter que aguardar fazer as chamadas e inserir no banco os dados
//export const insertProduct
const insertProduct = async (product: Product) => {
    await dbQueryShared('INSERT INTO products (name,price,quantity,category) VALUES(?,?,?,?)',[product.name,product.price,product.quantity,product.category]);
    let retornoDB = await listAllProduct();
	//let retornoDB = await dbQueryShared(`SELECT seq FROM sqlite_sequence WHERE name = 'products'`);
	//return getProductById(retornoDB[0].id);
	//return retornoDB[0].id as number | undefined;
	
	const productSearch = await getProductById(retornoDB[0].id);
	productSearch as Product | undefined;
	if(productSearch?.name == product.name && productSearch?.price == product.price && productSearch?.quantity == product.quantity && productSearch?.category == product.category) {
	 return productSearch;	
	} else {
		return
	}
        

}

const updateProductById = async (updateProduct: Product) => {
    await dbQueryShared('UPDATE products SET name = ?, price = ?, quantity = ?, category = ? WHERE id = ?',[updateProduct.name, updateProduct.price, updateProduct.quantity, updateProduct.category, updateProduct.id]);
    return getProductById(updateProduct.id);
}

const listAllProduct = async () => {
    const returnProducts = await dbQueryShared('SELECT * from products');
    return returnProducts as Product[]; //testar sem dados para ver se precisa add um undefined aqui ??
}

const getProductById = async (idProduct: number) => {
    const returnProduct = await dbQuerySharedFirst('SELECT * from products WHERE id = ?', [idProduct]);
    return returnProduct as Product | undefined; //undefined porque talvez não encontre a informação
}

const deleteProductById = async (idProduct: number) => {
    await dbQuerySharedFirst('DELETE from products WHERE id = ?', [idProduct]);
}

/*
const listProductsType = async () => {
    const returnProducts = await dbQueryShared('SELECT * from product' // add condição WHERE category == 'value X');
    return returnProducts;
} */

export const productModel = {
    insertProduct,
    listAllProduct,
    getProductById,
    deleteProductById,
    updateProductById
}

/*

json insomnia // postman ...
{
	"name": "Conti guarana 2 litros",
	"price": 3.58,
	"quantity": 10,
	"category": "bebida"
}

	{
	"name": "dollynho framboesa 2 litros",
	"price": 3.58,
	"quantity": 10,
	"category": "bebida"
},

{
		"id": 2,
		"name": "Conti cola 2 litros",
		"price": 3.58,
		"quantity": 10,
		"category": "bebida"
	},
	{
		"id": 3,
		"name": "Conti laranja 2 litros",
		"price": 3.58,
		"quantity": 10,
		"category": "bebida"
	},
	{
		"id": 4,
		"name": "Conti limão 2 litros",
		"price": 3.58,
		"quantity": 10,
		"category": "bebida"
	},
	{
		"id": 5,
		"name": "Conti uva 2 litros",
		"price": 3.58,
		"quantity": 10,
		"category": "bebida"
	}


*/