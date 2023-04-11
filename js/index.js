(function (){

    class Tarea {
        #Id;
        #titulo;
        #descripcion;
        #lastId = 0;
        constructor(titulo, descripcion){
            this.#Id = this.generarId();
            this.#titulo = titulo;
            this.#descripcion = descripcion;
        }

        get Id(){
            return this.#Id;
        }

        set Id(Id){
            this.#Id = Id;
        }

        get titulo(){
            return this.#titulo;
        }

        set titulo(titulo){
            this.#titulo = titulo;
        }

        get descripcion(){
            return this.#descripcion;
        }

        set descripcion(descripcion){
            this.#descripcion = descripcion;
        }

        get lastId(){
            return this.#lastId;
        }

        set lastId(lastId){
            this.#lastId = lastId;
        }

        generarId(){
            //Utilizo los get y set para acceder y guardar la propiedad
            let ultimoId = this.lastId;
            ultimoId++
            this.lastId = ultimoId;
            return ultimoId;
        }
    }

    class ListaTareas {
        #tareas;
        constructor(){
            this.#tareas = [];
        }

        get tareas(){
            return this.#tareas;
        }

        set tareas(tareas){
            if (Array.isArray(tareas)) {
                this.#tareas = tareas;
                return `Las tareas se guardaron correctamente`;
            } else {
                return `La lista de tareas debe ser un array!`; 
            }
        }

        agregarTarea(tarea){
            //Lo hago de esta forma para utilizar setters y getters al momento de agregar una tarea.
            const nuevoArrayTareas = this.tareas;
            nuevoArrayTareas.push(tarea);
            this.tareas = nuevoArrayTareas;
            this.mostrarTareas();
        }

        mostrarTareas(){
            const listaTareasElement = document.querySelector(".lista-tareas");
            listaTareasElement.innerHTML = "";
            this.tareas.forEach(tarea => {
                const tareaElement = document.createElement("li");
                tareaElement.innerHTML = `
                    <h4>${tarea.titulo}</h4>
                    <p>${tarea.descripcion}</p>
                    <button class="borrar-tarea" data-id="${tarea.Id}">X</button>
                `;
                listaTareasElement.appendChild(tareaElement);
            });
    
            const botonesBorrar = listaTareasElement.querySelectorAll(".borrar-tarea");
            botonesBorrar.forEach(boton => {
                boton.addEventListener("click", () => {
                    const id = parseInt(boton.dataset.id);
                    this.borrarTarea(id);
                    this.mostrarTareas();
                    console.log(id);
                });
            });
        }

        borrarTarea(id){
            const nuevoArrayTareas = this.tareas;
            const arrayFiltrado = nuevoArrayTareas.filter(tarea => tarea.id !== id);
            this.tareas = arrayFiltrado;
        }
    }


    function crearTarea(titulo, descripcion) {
        return new Tarea(titulo, descripcion);
    }
    
    const listaTareas = new ListaTareas();
    const formulario = document.querySelector(".formulario");
    const listaTareasElement = document.querySelector(".lista-tareas");
    
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const titulo = formulario["titulo-tarea"].value || "";
        const descripcion = formulario["descripcion-tarea"].value || "";

        //Como pense que tal vez no estaba creando una nueva instancia de tarea cada vez que se disparaba el evento submit
        //Hice una funcion que cree la tarea afuera del evento.
        const tarea = crearTarea(titulo, descripcion);
        // Intente llamando al metodo luego de crear la tarea, para ver si aumentaba el lastId pero no.
        // tarea.generarId();
        
        listaTareas.agregarTarea(tarea, listaTareasElement);
    })
})();