document.addEventListener("DOMContentLoaded",function(){

    
    const template = document.querySelector("template");
    
    const inputEmail = document.querySelector("#email");

    const inputAsunto = document.querySelector("#asunto");

    const inputMensaje = document.querySelector("#mensaje");

    const formulario = document.querySelector("#formulario");

    const cuerpoForm = document.querySelector("#cuerpoForm");

    const btnSubmit = document.querySelector("#formulario button[type='submit']");
    
    const btnReset = document.querySelector("#formulario button[type='reset']");
    
    const email = {
        email: "",
        asunto: "",
        mensaje: "",
    }
    
    EventListener(inputEmail);
    
    EventListener(inputAsunto);
    
    EventListener(inputMensaje);
    
    formulario.addEventListener("submit", enviarEmail);
    
    btnReset.addEventListener("click", function(e){
        e.preventDefault();
        resetearCampos()
    });
    
    function EventListener(doc){
        doc.addEventListener("input", verificar);
    }
    function enviarEmail(e){
        e.preventDefault();

        const createSpinner = document.createElement("div");
        createSpinner.id = "spinner";
        createSpinner.classList.add("justify-center", "mt-4", "flex");
        createSpinner.append(template.content.cloneNode(true));
        cuerpoForm.appendChild(createSpinner);

        btnSubmit.classList.add("opacity-50");
        btnSubmit.disabled = true;

        setTimeout(() => {
            createSpinner.remove();
            resetearCampos();

            const alerta = e.target.parentElement.querySelector(".bg-green-500");

            if(alerta){
                alerta.remove();
            }else{
                const alertaExito = document.createElement("p");
                alertaExito.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
                alertaExito.textContent = "Email enviado con éxito";
                formulario.appendChild(alertaExito);

                setTimeout(() => {
                    alertaExito.remove();
                }, 3000);
            }
            

        }, 3000);

    };

    function resetearCampos(){
        email.email = "";
        email.asunto = "";
        email.mensaje = "";

        formulario.reset();
        comprobarEmail();
    }
    
    function verificar(e){
        const etiqueta = e.target;
        const valor = etiqueta.value;
        const elementoPadre = etiqueta.parentElement;
        if(valor.trim() === ""){
            msgAlert(`El campo ${e.target.id} no puede estar vacío`, elementoPadre);
            email[etiqueta.name] = "";
            comprobarEmail()
            return;
        }

        if(e.target.id === "email" && !validarEmail(valor)){
            comprobarEmail()
            msgAlert("El Email no es válido", elementoPadre);
            return;
        };

        limpiarAlerta(elementoPadre);

        email[etiqueta.name] = valor.trim().toLowerCase();

        comprobarEmail()
    }

    
    function msgAlert(mensaje, referencia){
        limpiarAlerta(referencia);

        const error = document.createElement("P");
        error.textContent = mensaje;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

        referencia.appendChild(error);
        comprobarEmail();
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector(".bg-red-600");
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado
    }

    function comprobarEmail(){
        if(Object.values(email).includes("") || formulario.querySelector(".bg-red-600")!= null){
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
        }else{
            btnSubmit.classList.remove("opacity-50");
            btnSubmit.disabled = false;
        };
    }

});
