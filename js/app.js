document.addEventListener("DOMContentLoaded", () => {
    const formTareas = document.getElementById("formTareas");
    const entradaTarea = document.getElementById("entradaTarea");
    const listaTareas = document.getElementById("listaTareas");
    const filtroTodos = document.getElementById("filtroTodos");
    const filtroPendientes = document.getElementById("filtroPendientes");
    const filtroCompletados = document.getElementById("filtroCompletados");

    //funciones
    function crearTarea(texto, completada = false) {
        const li = document.createElement("li");
        li.classList.add("tarea");
        if (completada) li.classList.add("completada");

        const span = document.createElement("span");
        span.textContent = texto;

        const contenedorBotones = document.createElement("div");
        contenedorBotones.classList.add("acciones");

        const btnCompletar = document.createElement("button");
        btnCompletar.textContent = "🔵";
        btnCompletar.classList.add("btnCompletar");

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "🔴";
        btnEliminar.classList.add("btnEliminar");

        btnCompletar.addEventListener("click", () => {
            li.classList.toggle("completada");
            guardarTareas();
            actualizarContador();
        });

        btnEliminar.addEventListener("click", () => {
            if (confirm("¿Seguro que quieres eliminar esta tarea?")) {
                li.remove();
                guardarTareas();
                actualizarContador();
            }
        });

        contenedorBotones.appendChild(btnCompletar);
        contenedorBotones.appendChild(btnEliminar);

        li.appendChild(span);
        li.appendChild(contenedorBotones);
        listaTareas.appendChild(li);
        guardarTareas();
        actualizarContador();
    }

    function guardarTareas() {
        const tareas = [];

        document.querySelectorAll("#listaTareas .tarea").forEach(li => {
            tareas.push({
                texto: li.querySelector("span").textContent,
                completada: li.classList.contains("completada")
            });
        });

        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function cargarTareas() {
        const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareas.forEach(tarea => {
            crearTarea(tarea.texto, tarea.completada);
        });
    }

    function actualizarContador() {
        const pendientes = document.querySelectorAll(
            "#listaTareas .tarea:not(.completada)"
        ).length;

        contadorPendientes.textContent = `Pendientes: ${pendientes}`;
    }

    //eventos

    formTareas.addEventListener("submit", e => {
        e.preventDefault();

        const texto = entradaTarea.value.trim();
        if (texto === "") return;

        crearTarea(texto);
        entradaTarea.value = "";
    });

    filtroTodos.addEventListener("click", () => {
        document.querySelectorAll("#listaTareas .tarea").forEach(li => {
            li.style.display = "flex";
        });
    });

    filtroPendientes.addEventListener("click", () => {
        document.querySelectorAll("#listaTareas .tarea").forEach(li => {
            li.style.display = li.classList.contains("completada")
                ? "none"
                : "flex";
        });
    });

    filtroCompletados.addEventListener("click", () => {
        document.querySelectorAll("#listaTareas .tarea").forEach(li => {
            li.style.display = li.classList.contains("completada")
                ? "flex"
                : "none";
        });
    });

    cargarTareas();
    actualizarContador();
});