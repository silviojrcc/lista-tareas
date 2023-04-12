(function (){
    //Si emi o marcos viene a ver mi repo, lo solucioné con esta variable global
    //Lo que sucedía es que yo tenía lastId en el prototipo/clase Tarea y siempre lo iniciaba en 0.
    //Obviamente eso no se pasaba a otra instancia, todas las instancias iban a comenzar con lastId en 0.
    let ultimoId = 0;

    class Tarea {
        #Id;
        #titulo;
        #descripcion;
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

        generarId(){
            ultimoId++;
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
            console.log(this.tareas)
        }

        mostrarTareas(){
            const listaTareasElement = document.querySelector(".lista-tareas");
            listaTareasElement.innerHTML = "";
            this.tareas.forEach(tarea => {
                const tareaElement = document.createElement("article");
                tareaElement.innerHTML = `
                        <div class="col">
                            <div class="card mb-4 rounded-3 shadow-sm">
                            <div class="card-header py-3 bg-dark">
                                <h4 class="my-0 fw-normal text-light">${tarea.titulo}</h4>
                            </div>
                            <div class="card-body bg-dark">
                                <p class="text-light">${tarea.descripcion}</p>
                                <button type="button" data-id="${tarea.Id}" class="borrar-tarea w-100 btn btn-lg btn-outline-primary">Borrar tarea</button>
                                </div>
                            </div>
                        </div>
                `;
                listaTareasElement.appendChild(tareaElement);
            });
    
            const botonesBorrar = listaTareasElement.querySelectorAll(".borrar-tarea");
            botonesBorrar.forEach(boton => {
                boton.addEventListener("click", () => {
                    const id = parseInt(boton.dataset.id);
                    this.borrarTarea(id);
                    this.mostrarTareas();
                });
            });
        }

        borrarTarea(id) {
            const nuevoArrayTareas = this.tareas;
            const tareaIndex = nuevoArrayTareas.findIndex(tarea => tarea.Id === id);
            if (tareaIndex !== -1) {
              nuevoArrayTareas.splice(tareaIndex, 1);
            } else {
                console.log("no se encontro esa tarea?")
            }
            this.tareas = nuevoArrayTareas;
          }
    }
    
    const listaTareas = new ListaTareas();
    const formulario = document.querySelector(".formulario");
    const listaTareasElement = document.querySelector(".lista-tareas");
    const advertencia = document.querySelector(".advertencia");
    
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const titulo = formulario["titulo-tarea"].value || "";
        const descripcion = formulario["descripcion-tarea"].value || "";
        advertencia.innerHTML = "";
        titulo.textContent = "";
        descripcion.textContent = "";

        if (titulo !== "" && descripcion !== "") {
            const tarea = new Tarea(titulo, descripcion);
            listaTareas.agregarTarea(tarea, listaTareasElement);
        } else {
            advertencia.innerHTML = `<p>Debe ingresar ambos campos para poder añadir una tarea!!</p>`;
        }
        
    })
})();