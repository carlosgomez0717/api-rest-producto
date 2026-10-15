import { ProductService } from '../services/product.service.js';

export class ProductController {
  static async getAll(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      const status = error.message === 'Producto no encontrado' ? 404 : 400;
      res.status(status).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}