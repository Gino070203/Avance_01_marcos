(() => {
    'use strict'

    const form = document.getElementById('formulario')
    const modal = new bootstrap.Modal(document.getElementById('modalFormulario'))

    form.addEventListener('submit', function (event) {

        event.preventDefault()
        event.stopPropagation()

        if (form.checkValidity()) {

            modal.show()
    
            // 🔥 RESET COMPLETO
            form.reset()
            form.classList.remove('was-validated')
    
            // 🔥 quitar checks verdes/rojos
            const inputs = form.querySelectorAll("input, textarea")
            inputs.forEach(input => {
                input.classList.remove("is-valid", "is-invalid")
            })
    
        } else {
    
            form.classList.add('was-validated')
    
        }

    }, false)

    // Validación por campo individual
    const inputs = form.querySelectorAll("input, textarea")

    inputs.forEach(input => {
        input.addEventListener("input", () => {
    
            if (input.value === "") {
                input.classList.remove("is-valid", "is-invalid")
                return
            }
    
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