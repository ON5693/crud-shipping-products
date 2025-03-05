import Product from '../models/product.model';

export const createProduct = async (data: any) => new Product(data).save();
export const getAllProducts = async () => Product.find();
export const getProductById = async (id: string) => Product.findById(id);
export const updateProduct = async (id: string, data: any) => Product.findByIdAndUpdate(id, data, { new: true });
export const deleteProduct = async (id: string) => Product.findByIdAndDelete(id);