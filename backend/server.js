// 1. IMPORTAR LAS HERRAMIENTAS NECESARIAS
// Estas son librerías que nos ayudan a crear el servidor
const express = require('express');
const fs = require('fs').promises; // Para escribir en el archivo
const path = require('path');
const cors = require('cors');

// 2. CREAR LA APLICACIÓN EXPRESS
const app = express();
const port = 3000; // El puerto donde vivirá nuestro servidor

// 3. CONFIGURAR MIDDLEWARES
// Estos son traductores que ayudan al servidor a entender los datos que le enviamos
app.use(cors()); // Permite que el frontend se comunique con el backend
app.use(express.json()); // Entiende datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Entiende datos de formularios

// 4. LA RUTA MÁS IMPORTANTE: GUARDAR SOLICITUDES
// Esta función se ejecuta cuando el frontend envía los datos del formulario
app.post('/solicitud', async (req, res) => {
    try {
        console.log('📩 Recibiendo una nueva solicitud de recogida...');

        // 1. Capturar los datos que vienen del frontend
        const { nombre, direccion, telefono, fecha } = req.body;

        // 2. Crear un objeto bonito con esos datos
        const nuevaSolicitud = {
            nombre,
            direccion,
            telefono,
            fecha,
            fechaRecibida: new Date().toLocaleString() // Agrega la hora y fecha exacta en que se recibió
        };

        console.log('Datos recibidos:', nuevaSolicitud);

        // 3. Guardar la solicitud en un archivo (nuestra "base de datos")
        const archivoPath = path.join(__dirname, 'solicitudes.txt');
        await fs.appendFile(archivoPath, JSON.stringify(nuevaSolicitud) + ',\n');

        console.log('✅ Solicitud guardada correctamente en solicitudes.txt');

        // 4. Responder al frontend que todo salió bien
        res.status(200).json({ 
            success: true, 
            message: '¡Solicitud recibida! Un reciclador será notificado.' 
        });

    } catch (error) {
        console.error('❌ Error al guardar la solicitud:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor. Intenta nuevamente.' 
        });
    }
});

// 5. INICIAR EL SERVIDOR
// Esta línea enciende el motor y deja al servidor escuchando
app.listen(port, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
});