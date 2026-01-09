document.addEventListener("DOMContentLoaded", () => {
    const formTareas = document.getElementById("formTareas");
    const entradaTarea = document.getElementById("entradaTarea");
    const listaTareas = document.getElementById("listaTareas");
    const filtroTodos = document.getElementById("filtroTodos");
    const filtroPendientes = document.getElementById("filtroPendientes");
    const filtroCompletados = document.getElementById("filtroCompletados");

    //funciones
    function crearTarea(texto, completada = false) {
        const tr = document.createElement("tr");
        tr.classList.add("tarea");
        if (completada) tr.classList.add("completada");

        const tdTexto = document.createElement("td");
        tdTexto.textContent = texto;

        const tdEstado = document.createElement("td");
        tdEstado.textContent = completada ? "Completada" : "Pendiente";

        const tdAcciones = document.createElement("td");

        const btnCompletar = document.createElement("button");
        btnCompletar.textContent = "🔵";
        btnCompletar.classList.add("btnCompletar");

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "🔴";
        btnEliminar.classList.add("btnEliminar");

        btnCompletar.addEventListener("click", () => {
            tr.classList.toggle("completada");
            const esCompletada = tr.classList.contains("completada");
            tdEstado.textContent = esCompletada ? "Completada" : "Pendiente";
            guardarTareas();
            actualizarContador();
        });

        btnEliminar.addEventListener("click", () => {
            if (confirm("¿Seguro que quieres eliminar esta tarea?")) {
                tr.remove();
                guardarTareas();
                actualizarContador();
            }
        });

        tdAcciones.appendChild(btnCompletar);
        tdAcciones.appendChild(btnEliminar);

        tr.appendChild(tdTexto);
        tr.appendChild(tdEstado);
        tr.appendChild(tdAcciones);

        listaTareas.appendChild(tr);

        guardarTareas();
        actualizarContador();
    }


    function guardarTareas() {
        const tareas = [];

        document.querySelectorAll("#listaTareas .tarea").forEach(tr => {
            tareas.push({
                texto: tr.children[0].textContent,
                completada: tr.classList.contains("completada")
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
        document.querySelectorAll("#listaTareas .tarea").forEach(tr => {
            tr.style.display = "";
        });
    });

    filtroPendientes.addEventListener("click", () => {
        document.querySelectorAll("#listaTareas .tarea").forEach(tr => {
            tr.style.display = tr.classList.contains("completada")
                ? "none"
                : "";
        });
    });

    filtroCompletados.addEventListener("click", () => {
        document.querySelectorAll("#listaTareas .tarea").forEach(tr => {
            tr.style.display = tr.classList.contains("completada")
                ? ""
                : "none";
        });
    });


    cargarTareas();
    actualizarContador();
});