(function (){

    class Tarea {
        #Id;
        #titulo;
        #descripcion;
        constructor(titulo, descripcion){
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
    }

    class ListaTareas {
        #tareas = [];
        constructor(tareas){
            this.#tareas = tareas;
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
        }

        borrarTarea(id){
            const nuevoArrayTareas = this.tareas;
            const arrayFiltrado = nuevoArrayTareas.filter(tarea => tarea.id !== id);
            this.tareas = arrayFiltrado;
        }
    }


})();