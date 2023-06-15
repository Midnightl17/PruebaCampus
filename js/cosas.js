let servicios = [];
let LS = window.localStorage;

if (LS.getItem('servicios')) {
    servicios = JSON.parse(LS.getItem('servicios'));
}

imprimirServicio(servicios)

let form = document.querySelector("#form-anadir")

form.addEventListener('submit', e =>{
    e.preventDefault();

    anadirServicio();
})


function anadirServicio(){
    let nombre = document.querySelector("#nombres").value;
    let valor = document.querySelector("#valor ").value;
    let descripcion = document.querySelector("#descripcion").value;
    let puntos = document.querySelector("#puntos").value;

    let nuevoServicio = {
        id: Date.now(),
        nombre,
        valor,
        descripcion,
        puntos
    }

    servicios.push(nuevoServicio);

    form.reset();
    
    LS.setItem('servicios', JSON.stringify(servicios));

    imprimirServicio(servicios);


}

function imprimirServicio(dic){
    let tabla = document.querySelector("#tabla-servicios");
    tabla.innerHTML = "";

    dic.forEach(servicio => {
        tabla.innerHTML += `
        <tr>
        <td>${servicio.id}</td>
        <td>${servicio.nombre}</td>
        <td>${servicio.valor}</td>
        <td>${servicio.descripcion}</td>
        <td>${servicio.puntos}</td>

        <td class="">
        <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-danger" onclick="eliminar(${servicio.id})"> B </button>
        </div>

        </td>
        </tr>

        `
    });
}

function eliminar(id){
    servicios = servicios.filter(servicio =>servicio.id !== id);
    imprimirServicio(servicios)
    LS.setItem('servicios', JSON.stringify(servicios));
}