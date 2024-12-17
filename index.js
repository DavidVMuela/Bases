// Importar dependencias
const mongoose = require('mongoose');

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/examen', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB')).catch(err => console.error('Error al conectar:', err));

// Definir el esquema del documento
const itemSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  estado: { type: Number, default: 1 }, // 1 = activo, 0 = inactivo
}, { timestamps: true });

// Crear un índice (ejemplo en el campo "nombre")
itemSchema.index({ nombre: 1 });

// Crear el modelo
const Item = mongoose.model('Item', itemSchema);

// Crear un nuevo documento
async function crearItem(nombre, descripcion) {
  const nuevoItem = new Item({ nombre, descripcion });
  await nuevoItem.save();
  console.log('Documento creado:', nuevoItem);
}

// Leer documentos
async function leerItems() {
  const items = await Item.find({ estado: 1 }); // Solo documentos activos
  console.log('Documentos activos:', items);
}

// Actualizar un documento
async function actualizarItem(id, datosActualizados) {
  const itemActualizado = await Item.findByIdAndUpdate(id, datosActualizados, { new: true });
  console.log('Documento actualizado:', itemActualizado);
}

// Eliminar un documento de forma lógica
async function eliminarItemLogicamente(id) {
  const itemEliminado = await Item.findByIdAndUpdate(id, { estado: 0 }, { new: true });
  console.log('Documento eliminado lógicamente:', itemEliminado);
}

// Ejecución de ejemplos
(async () => {
  // Crear un nuevo documento
  await crearItem('Ejemplo', 'Descripción del ejemplo');

  // Leer documentos activos
  await leerItems();

  // Actualizar un documento (reemplaza el ID por uno válido en tu base de datos)
  // await actualizarItem('ID_DEL_DOCUMENTO', { descripcion: 'Nueva descripción' });

  // Eliminar un documento lógicamente (reemplaza el ID por uno válido en tu base de datos)
  // await eliminarItemLogicamente('ID_DEL_DOCUMENTO');

  mongoose.connection.close();
})();
