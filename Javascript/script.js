// Función autoejecutable (encapsula el código)
(() => {
    'use strict' // Modo estricto

    // Referencias al formulario y modal
    const form = document.getElementById('formulario')
    const modal = new bootstrap.Modal(document.getElementById('modalFormulario'))

    // Evento submit del formulario
    form.addEventListener('submit', function (event) {

        // Evita recarga y envío por defecto
        event.preventDefault()
        event.stopPropagation()

        // Validación general del formulario
        if (form.checkValidity()) {

            // Mostrar modal de éxito
            modal.show()

            // Resetear formulario
            form.reset()
            form.classList.remove('was-validated')

            // Limpiar estilos de validación (verde/rojo)
            const inputs = form.querySelectorAll("input, textarea")
            inputs.forEach(input => {
                input.classList.remove("is-valid", "is-invalid")
            })

        } else {

            // Activa estilos de error de Bootstrap
            form.classList.add('was-validated')

        }

    }, false)

    // Validación en tiempo real por cada campo
    const inputs = form.querySelectorAll("input, textarea")

    inputs.forEach(input => {
        input.addEventListener("input", () => {

            // Si está vacío, limpia estados
            if (input.value === "") {
                input.classList.remove("is-valid", "is-invalid")
                return
            }

            // Validación individual
            if (input.checkValidity()) {
                input.classList.add("is-valid")
                input.classList.remove("is-invalid")
            } else {
                input.classList.add("is-invalid")
                input.classList.remove("is-valid")
            }

        })
    })

})();



// 'DOMContentLoaded' asegura que el código se ejecute SOLO cuando toda la página HTML ha cargado.
document.addEventListener('DOMContentLoaded', function() {
            
    // --- SECCIÓN DE CAPTURA DE ELEMENTOS HTML ---
    // Aquí "atrapamos" los elementos del HTML por su ID o Clase para poder manipularlos.
    const botonesReservar = document.querySelectorAll('.open-modal-btn'); // Todos los botones "Reservar"
    const nombreHabitacionModal = document.getElementById('nombreHabitacionModal'); // El texto en el título del modal
    
    const pasoFecha = document.getElementById('pasoFecha'); // El div del Paso 1
    const pasoDias = document.getElementById('pasoDias');   // El div del Paso 2
    const pasoExito = document.getElementById('pasoExito'); // El div del Paso 3
    
    const fechaReserva = document.getElementById('fechaReserva'); // El input del calendario
    const diasReserva = document.getElementById('diasReserva');   // El input de cantidad de días
    const mensajeFinal = document.getElementById('mensajeFinal'); // El texto donde pondremos el éxito
    
    const btnAceptarFecha = document.getElementById('btnAceptarFecha');
    const btnConfirmarReserva = document.getElementById('btnConfirmarReserva');


    // --- FLUJO 1: AL ABRIR EL MODAL ---
    // Le agregamos un "escuchador de eventos" (click) a cada botón de la tabla.
    botonesReservar.forEach(boton => {
        boton.addEventListener('click', function() {
            // Obtenemos el nombre de la habitación desde el atributo 'data-room' del botón que fue presionado
            const nombreHabitacion = this.getAttribute('data-room');
            // Colocamos ese nombre en el título del modal
            nombreHabitacionModal.textContent = nombreHabitacion;
            
            // Reiniciamos el formulario: Mostramos el Paso 1 y ocultamos los demás
            pasoFecha.style.display = 'block';
            pasoDias.style.display = 'none';
            pasoExito.style.display = 'none';
            
            // Limpiamos cualquier valor previo que el usuario haya escrito
            fechaReserva.value = '';
            diasReserva.value = '1';
        });
    });


    // --- FLUJO 2: PASAR DE FECHA A DÍAS ---
    btnAceptarFecha.addEventListener('click', function() {
        // Validamos que el usuario realmente haya elegido una fecha
        if (!fechaReserva.value) {
            alert("Por favor, seleccione una fecha del calendario.");
            return; // Si no hay fecha, detenemos la ejecución aquí.
        }
        // Si la fecha es válida, ocultamos el Paso 1 y mostramos el Paso 2
        pasoFecha.style.display = 'none';
        pasoDias.style.display = 'block';
    });


    // --- FLUJO 3: CONFIRMAR LA RESERVA ---
    btnConfirmarReserva.addEventListener('click', function() {
        // Convertimos el valor de texto a un número entero
        const dias = parseInt(diasReserva.value);
        
        // Validación de seguridad: Asegurarnos de que los días estén entre 1 y 7
        if (dias < 1 || dias > 7) {
            alert("El número de días debe estar entre 1 y 7.");
            return; // Detiene la ejecución si el número es inválido
        }

        // Ocultamos el Paso 2 y mostramos el mensaje de éxito (Paso 3)
        pasoDias.style.display = 'none';
        pasoExito.style.display = 'block';
        
        // Imprimimos el mensaje final inyectando la fecha que eligió el usuario
        mensajeFinal.textContent =  ` Reservación para el día ${fechaReserva.value} fue aceptada.`;
    });
});


/*Evita que el foco este dentro del modal, evitando asi el error area-hiden */
const modal = document.getElementById('modalReserva');

modal.addEventListener('hide.bs.modal', () => {
  document.activeElement.blur();
});