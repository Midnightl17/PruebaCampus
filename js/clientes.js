let clientes = [];
let editando = false;
let LS = window.localStorage;

 if (LS.getItem('clientes')) {
     clientes = JSON.parse(LS.getItem('clientes'));
 }

imprimirCliente(clientes);

let form = document.querySelector("#form-anadir");

form.addEventListener('submit',e => {
    e.preventDefault();

    anadirClientes();
})

function anadirClientes(){
    const identificacion = document.querySelector("#identificacion").value;
    const nombres = document.querySelector("#nombres").value;
    const apellidos = document.querySelector("#apellidos").value;
    const placa = document.querySelector("#placa").value;
    const tipo = document.querySelector("#tematica").value;
    const telefono = document.querySelector("#telefono").value;
    const email = document.querySelector("#email").value;


    let nuevoCliente = {
        id: editando === false ? Date.now():editando,
        identificacion,
        nombres,
        apellidos,
        placa,
        tipo,
        telefono,
        email,
        puntos: 0
    }

    if(editando){
        nuevoCliente.id = editando;
        clientes = clientes.map(cliente => cliente.id === editando ? nuevoCliente:cliente);
        document.querySelector("#btn-Add").textContent = "Agregar";
    } else{
        clientes.push(nuevoCliente);
    }


    editando = false

    form.reset();

    LS.setItem('clientes', JSON.stringify(clientes));

    imprimirCliente(clientes);

   

}


function imprimirCliente(dic){
    let tabla = document.querySelector("#tabla-clientes")
    tabla.innerHTML = "";

    dic.forEach(cliente => {
        tabla.innerHTML += `
        <tr>
        <td>${cliente.identificacion}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        <td>${cliente.placa}</td>
        <td>${cliente.tipo}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>

        <td class="">
        <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-primary me-1" onclick="cargarDatos(${cliente.id})"> E </button>
        <button class="btn btn-danger" onclick="eliminar(${cliente.id})"> B </button>
        </div>

        </td>
        </tr>
        
        `
    });
}

function eliminar(id){
    clientes = clientes.filter(cliente => cliente.id !== id);
    LS.setItem('clientes', JSON.stringify(clientes));
    imprimirCliente(clientes);
}

function cargarDatos(id){
    document.querySelector("#btn-Add").textContent = "Guardar Cambios";

    clientes.forEach(cliente =>{
        if(cliente.id === id){
            identificacion.value = cliente.identificacion;
            nombres.value = cliente.nombres;
            apellidos.value = cliente.apellidos;
            placa.value = cliente.placa;
            telefono.value = cliente.telefono;
            email.value = cliente.email;
        }
    })

    editando = id;
}  