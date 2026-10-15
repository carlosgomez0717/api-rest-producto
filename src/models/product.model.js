import db from '../config/database.js';

export class ProductModel {
  static async findAll() {
    const result = await db.query('SELECT * FROM productos');
    return result.rows; // En PostgreSQL las filas vienen en .rows
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM productos WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create({ nombre, precio, stock }) {
    // Usamos RETURNING id para obtener el ID generado automáticamente en Postgres
    const result = await db.query(
      'INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING id',
      [nombre, precio, stock]
    );
    return { id: result.rows[0].id, nombre, precio, stock };
  }

  static async update(id, { nombre, precio, stock }) {
    const result = await db.query(
      'UPDATE productos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4',
      [nombre, precio, stock, id]
    );
    return result.rowCount > 0; // En Postgres se usa rowCount en lugar de affectedRows
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM productos WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}