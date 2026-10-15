import { ProductModel } from '../models/product.model.js';

export class ProductService {
  static async getAllProducts() {
    return await ProductModel.findAll();
  }

  static async getProductById(id) {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  static async createProduct(data) {
    const { nombre, precio, stock } = data;
    if (!nombre || precio === undefined) {
      throw new Error('Nombre y precio son obligatorios');
    }
    if (precio < 0) {
      throw new Error('El precio no puede ser negativo');
    }
    return await ProductModel.create({ nombre, precio, stock: stock || 0 });
  }

  static async updateProduct(id, data) {
    await this.getProductById(id); // Valida existencia
    const updated = await ProductModel.update(id, data);
    if (!updated) {
      throw new Error('Error al actualizar el producto');
    }
    return { id, ...data };
  }

  static async deleteProduct(id) {
    await this.getProductById(id); // Valida existencia
    return await ProductModel.delete(id);
  }
}