// ==================================================
// FUNCIONES DE NAVEGACIÓN
// ==================================================

function ocultarTodasPantallas() {
    document.querySelectorAll('.pantalla').forEach(pantalla => {
        pantalla.classList.add('oculto');
    });
}

function mostrarInicio() {
    ocultarTodasPantallas();
    document.getElementById('pantalla-inicio').classList.remove('oculto');
}

function mostrarRegistroUsuario() {
    ocultarTodasPantallas();
    document.getElementById('pantalla-registro-usuario').classList.remove('oculto');
}

function mostrarLoginUsuario() {
    ocultarTodasPantallas();
    document.getElementById('pantalla-login-usuario').classList.remove('oculto');
}

function mostrarRegistroReciclador() {
    ocultarTodasPantallas();
    document.getElementById('pantalla-registro-reciclador').classList.remove('oculto');
}

function mostrarLoginReciclador() {
    ocultarTodasPantallas();
    document.getElementById('pantalla-login-reciclador').classList.remove('oculto');
}

function mostrarSolicitudRecoleccion() {
    ocultarTodasPantallas();
    document.getElementById('pantalla-registro').classList.remove('oculto');
}

function mostrarConfirmacion() {
    ocultarTodasPantallas();
    document.getElementById('pantalla-confirmacion').classList.remove('oculto');
}

// ==================================================
// FUNCIONES DE REGISTRO
// ==================================================

function registrarUsuario() {
    const inputs = document.querySelectorAll('#pantalla-registro-usuario input');
    const selects = document.querySelectorAll('#pantalla-registro-usuario select');
    
    const nombre = inputs[0].value;
    const telefono = inputs[1].value;
    const direccion = inputs[2].value;
    const zona = selects[0].value;
    const password = inputs[3].value;

    if (!nombre || !telefono || !direccion || !zona || !password) {
        alert('Por favor completa todos los campos');
        return;
    }

    // Guardar usuario en localStorage
    const usuario = { nombre, telefono, direccion, zona, password, tipo: 'usuario' };
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('¡Usuario registrado con éxito!');
    mostrarLoginUsuario();
}

function registrarReciclador() {
    const inputs = document.querySelectorAll('#pantalla-registro-reciclador input');
    const selects = document.querySelectorAll('#pantalla-registro-reciclador select');
    
    const nombre = inputs[0].value;
    const telefono = inputs[1].value;
    const zona = selects[0].value;
    const password = inputs[2].value;

    if (!nombre || !telefono || !zona || !password) {
        alert('Por favor completa todos los campos');
        return;
    }

    // Guardar reciclador en localStorage
    const reciclador = { nombre, telefono, zona, password, tipo: 'reciclador' };
    let recicladores = JSON.parse(localStorage.getItem('recicladores')) || [];
    recicladores.push(reciclador);
    localStorage.setItem('recicladores', JSON.stringify(recicladores));

    alert('¡Reciclador registrado con éxito!');
    mostrarLoginReciclador();
}

// ==================================================
// FUNCIONES DE LOGIN
// ==================================================

function loginUsuario() {
    const inputs = document.querySelectorAll('#pantalla-login-usuario input');
    const telefono = inputs[0].value;
    const password = inputs[1].value;

    if (!telefono || !password) {
        alert('Por favor ingresa teléfono y contraseña');
        return;
    }

    // Verificar credenciales
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioValido = usuarios.find(u => u.telefono === telefono && u.password === password);

    if (usuarioValido) {
        alert('¡Login exitoso! Bienvenido/a ' + usuarioValido.nombre);
        mostrarSolicitudRecoleccion();
    } else {
        alert('Teléfono o contraseña incorrectos');
    }
}

function loginReciclador() {
    const inputs = document.querySelectorAll('#pantalla-login-reciclador input');
    const telefono = inputs[0].value;
    const password = inputs[1].value;

    if (!telefono || !password) {
        alert('Por favor ingresa teléfono y contraseña');
        return;
    }

    // Verificar credenciales
    const recicladores = JSON.parse(localStorage.getItem('recicladores')) || [];
    const recicladorValido = recicladores.find(r => r.telefono === telefono && r.password === password);

    if (recicladorValido) {
        alert('¡Login exitoso! Bienvenido/a ' + recicladorValido.nombre);
        mostrarDashboardReciclador(recicladorValido.zona);
    } else {
        alert('Teléfono o contraseña incorrectos');
    }
}

// ==================================================
// SOLICITUD DE RECOGIDA
// ==================================================

function solicitarRecogida() {
    const inputs = document.querySelectorAll('#pantalla-registro input');
    const selects = document.querySelectorAll('#pantalla-registro select');
    
    const nombre = inputs[0].value;
    const direccion = inputs[1].value;
    const telefono = inputs[2].value;
    const zona = selects[0].value;
    const fecha = inputs[3].value;
    const reciclador = selects[1].value;

    if (!nombre || !direccion || !telefono || !zona || !fecha || !reciclador) {
        alert('Por favor completa todos los campos');
        return;
    }

    // Guardar solicitud
    const solicitud = { nombre, direccion, telefono, zona, fecha, reciclador };
    let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    solicitudes.push(solicitud);
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));

    alert('¡Solicitud enviada! Un reciclador será notificado.');
    mostrarConfirmacion();
}

// ==================================================
// DASHBOARD RECICLADOR (FUNCIONAL)
// ==================================================

function mostrarDashboardReciclador(zonaReciclador) {
    ocultarTodasPantallas();
    
    // Obtener solicitudes de la zona del reciclador
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    const solicitudesZona = solicitudes.filter(s => s.zona === zonaReciclador);
    
    let htmlSolicitudes = '';
    
    if (solicitudesZona.length > 0) {
        solicitudesZona.forEach((sol, index) => {
            htmlSolicitudes += `
                <div class="solicitud-item">
                    <h3>📋 Solicitud #${index + 1}</h3>
                    <p><strong>Usuario:</strong> ${sol.nombre}</p>
                    <p><strong>Dirección:</strong> ${sol.direccion}</p>
                    <p><strong>Teléfono:</strong> ${sol.telefono}</p>
                    <p><strong>Fecha:</strong> ${sol.fecha}</p>
                    <p><strong>Material:</strong> ${sol.reciclador}</p>
                    <button class="btn-aceptar" onclick="aceptarSolicitud(${index})">✅ Aceptar Solicitud</button>
                </div>
            `;
        });
    } else {
        htmlSolicitudes = '<p>No hay solicitudes en tu zona actualmente.</p>';
    }
    
    const dashboardHTML = `
        <h2>🗺️ Dashboard - Zona ${zonaReciclador.toUpperCase()}</h2>
        <div class="estadisticas">
            <p><strong>${solicitudesZona.length}</strong> solicitudes en tu zona</p>
        </div>
        
        <div class="lista-solicitudes">
            <h3>📬 Solicitudes de Recolección</h3>
            ${htmlSolicitudes}
        </div>
        
        <button class="btn-verde" onclick="mostrarInicio()">Volver al Inicio</button>
    `;
    
    let dashboardContainer = document.getElementById('pantalla-dashboard-reciclador');
    if (!dashboardContainer) {
        dashboardContainer = document.createElement('div');
        dashboardContainer.id = 'pantalla-dashboard-reciclador';
        dashboardContainer.className = 'pantalla';
        document.body.appendChild(dashboardContainer);
    }
    
    dashboardContainer.innerHTML = dashboardHTML;
    dashboardContainer.classList.remove('oculto');
}

function aceptarSolicitud(index) {
    alert('¡Solicitud aceptada! Pronto te contactaremos.');
    // Aquí iría la lógica para mover la solicitud a "aceptadas"
}

// ==================================================
// FUNCIÓN DE SONIDO
// ==================================================

function playSound() {
    alert('🔔 Sonido de notificación activado!');
}

// ==================================================
// CONEXIÓN DE BOTONES
// ==================================================

function conectarBotones() {
    // Pantalla de INICIO
    document.getElementById('btnUsuario').onclick = mostrarRegistroUsuario;
    document.getElementById('btnReciclador').onclick = mostrarRegistroReciclador;
    document.getElementById('linkLoginUsuario').onclick = mostrarLoginUsuario;
    document.getElementById('linkLoginReciclador').onclick = mostrarLoginReciclador;

    // Pantalla REGISTRO USUARIO
    document.getElementById('btnRegistrarUsuario').onclick = registrarUsuario;
    document.getElementById('linkLoginDesdeRegistroUsuario').onclick = mostrarLoginUsuario;
    document.getElementById('btnVolverInicio1').onclick = mostrarInicio;

    // Pantalla LOGIN USUARIO
    document.getElementById('btnLoginUsuario').onclick = loginUsuario;
    document.getElementById('linkRegistroDesdeLoginUsuario').onclick = mostrarRegistroUsuario;
    document.getElementById('btnVolverInicio2').onclick = mostrarInicio;

    // Pantalla REGISTRO RECICLADOR
    document.getElementById('btnRegistrarReciclador').onclick = registrarReciclador;
    document.getElementById('linkLoginDesdeRegistroReciclador').onclick = mostrarLoginReciclador;
    document.getElementById('btnVolverInicio3').onclick = mostrarInicio;

    // Pantalla LOGIN RECICLADOR
    document.getElementById('btnLoginReciclador').onclick = loginReciclador;
    document.getElementById('linkRegistroDesdeLoginReciclador').onclick = mostrarRegistroReciclador;
    document.getElementById('btnVolverInicio4').onclick = mostrarInicio;

    // Pantalla SOLICITUD
    document.getElementById('btnSolicitarRecogida').onclick = solicitarRecogida;
    document.getElementById('btnVolverInicio5').onclick = mostrarInicio;

    // Pantalla CONFIRMACIÓN
    document.getElementById('btnSonido').onclick = playSound;
    document.getElementById('btnVolverInicio6').onclick = mostrarInicio;
}

// ==================================================
// INICIALIZACIÓN
// ==================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Aplicación Recylin cargada correctamente');
    conectarBotones();
});