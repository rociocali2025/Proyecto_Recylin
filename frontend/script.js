// Función para mostrar la pantalla de registro
function mostrarRegistro() {
    document.getElementById('pantalla-inicio').classList.add('oculto');
    document.getElementById('pantalla-registro').classList.remove('oculto');
}

// Función para mostrar el login de recicladores
function mostrarLoginReciclador() {
    document.getElementById('pantalla-inicio').classList.add('oculto');
    document.getElementById('pantalla-login-reciclador').classList.remove('oculto');
}

// Función para volver a la pantalla de inicio
function mostrarInicio() {
    document.querySelectorAll('.pantalla').forEach(pantalla => {
        pantalla.classList.add('oculto');
    });
    document.getElementById('pantalla-inicio').classList.remove('oculto');
}

// Función para el sonido de notificación
function playSound() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);
}

// ------- FUNCIÓN CORREGIDA PARA "SOLICITAR RECOGIDA" -------
async function solicitarRecogida() {
    // 1. Obtener los valores que la persona escribió (FORMA CORREGIDA)
    const inputs = document.querySelectorAll('#pantalla-registro input');
    const nombre = inputs[0].value;        // Primer input (Tu nombre)
    const direccion = inputs[1].value;     // Segundo input (Tu dirección completa)
    const telefono = inputs[2].value;      // Tercer input (Tu número de teléfono)
    const fecha = inputs[3].value;         // Cuarto input (La fecha)

    // 2. Crear un objeto con todos los datos
    const datosRecoleccion = {
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        fecha: fecha
    };

    // 3. Mostrar un mensaje de "Cargando..." (Feedback para el usuario)
    alert('Enviando tu solicitud... por favor espera.');

    try {
        // 4. Enviar los datos al servidor (BACKEND)
        const respuesta = await fetch('http://localhost:3000/solicitud', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosRecoleccion)
        });

        // 5. Leer la respuesta del servidor
        const resultado = await respuesta.json();

        // 6. Verificar si el servidor confirmó que todo salió bien
        if (resultado.success) {
            // Si todo sale bien, mostrar pantalla de confirmación
            document.getElementById('pantalla-registro').classList.add('oculto');
            document.getElementById('pantalla-confirmacion').classList.remove('oculto');
        } else {
            // Si hay un error, mostrar mensaje
            alert('Error: ' + resultado.message);
        }

    } catch (error) {
        // 7. Si hay un error de conexión (ej: servidor apagado)
        console.error('Error:', error);
        alert('No se pudo conectar con el servidor. Verifica que esté encendido.');
    }
}

// ------- ACTIVAR EL BOTÓN ------- 
// Esta línea le dice al botón que use la función cuando se haga clic
document.addEventListener('DOMContentLoaded', function() {
    const botonSolicitar = document.querySelector('#pantalla-registro button');
    botonSolicitar.addEventListener('click', solicitarRecogida);
});