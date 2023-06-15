let clientes = [];
let servicios = [];
let dicCliente = [];
let dicServicio = [];
let LS = window.localStorage;

if (LS.getItem('servicios')) {
    servicios = JSON.parse(LS.getItem('servicios'));
}

if (LS.getItem('clientes')) {
    clientes = JSON.parse(LS.getItem('clientes'));
}



const modClientes = document.querySelector('#clientes');
const modServicios = document.querySelector('#servicios');

imprimirCliente(clientes);


//Seleccionar el cliente

const inputBuscar = document.querySelector('#buscar-clientes');
inputBuscar.addEventListener('keyup', buscarClientes);

const btnSelectCliente = document.querySelector('#select-cliente');
btnSelectCliente.addEventListener('click', () => {

    modClientes.classList.add('d-none');
    modServicios.classList.remove('d-none');

    cargarClienteTicket();
});


function buscarClientes(){
    if (isNaN(inputBuscar.value)){
        busqueda = clientes.filter(function(cliente){
            return (
                cliente.apellidos.toLowerCase().includes(inputBuscar.value.toLowerCase()) || 
                cliente.nombres.toLowerCase().includes(inputBuscar.value.toLowerCase())
            )
        });

        if(busqueda.length === 1){
            btnSelectCliente.classList.remove('disabled');
        } else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectCliente.classList.contains('disabled')) {
        }
        dicCliente = busqueda;
        imprimirCliente(busqueda);
    } else{
        let busqueda = clientes.filter(function(cliente){
            return cliente.identificacion.includes(inputBuscar.value);
            
        })
        if(busqueda.length === 1){
            btnSelectCliente.classList.remove('disabled');
        }
        else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectCliente.classList.contains('disabled')) {
        }
        dicCliente = busqueda;
        imprimirCliente(busqueda);
    }
} 

function cargarClienteTicket(){
    let clienteDatos = document.querySelector("#clienteDatos");
    clienteDatos.innerHTML = `
    <p><b>Documento:</b> ${dicCliente[0].identificacion} </p>
    <p><b>Nombres:</b> ${dicCliente[0].nombres}</p>
    <p><b>Teléfono:</b> ${dicCliente[0].telefono}</p>
    <p><b>Email:</b> ${dicCliente[0].email}</p>
    `
}


//Seleccionar servicio

imprimirServicio(servicios);

const inputBuscarS = document.querySelector('#buscar-servicios');
inputBuscarS.addEventListener('keyup', buscarServicios);

const btnSelectServicio = document.querySelector('#comprarServicio');
btnSelectServicio.addEventListener('click', () => {

    cargarServicioTicker();

    document.querySelector('#form-tickets').classList.add('d-none');

    clientes.forEach((cliente,idx) => {
        if(cliente.id === dicCliente[0].id){
            clientes[idx].puntos += parseInt(dicServicio[0].puntos)
        }
    })

    LS.setItem('clientes', JSON.stringify(clientes));

    
});

function buscarServicios(){
    if (inputBuscarS.value) { 
        let busqueda = servicios.filter(function (servicio) {
            return servicio.nombre.includes(inputBuscarS.value);
        })
        // Validar si es un sólo usuario
        if (busqueda.length === 1) {
            btnSelectServicio.classList.remove('disabled');
        } else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectServicio.classList.contains('disabled')) {
            btnSelectServicio.classList.add('disabled');
        }
        dicServicio = busqueda;

        imprimirServicio(busqueda);
    }
} 

function cargarServicioTicker(){
    let clienteDatos = document.querySelector("#serviciosDatos");
    clienteDatos.innerHTML = `

    <p><b>Valor Servicio:</b> ${dicServicio[0].valor} </p>
    <p><b>+IVA:</b> ${dicServicio[0].valor * 0.14}</p>
    <p><b>+Descuento:</b> ${(dicServicio[0].valor*0.06)} </p>
    <p><b>Total:</b> ${dicServicio[0].valor*1.08} </p>
    <hr>
    <p><b>Puntos de Fidelización de Servicio:</b> ${dicServicio[0].puntos}</p>
    `
}



// Imprimir las tablas 


//Tabla Servicio
function imprimirServicio(dic){
    let tabla = document.querySelector("#tabla-servicios");
    tabla.innerHTML = "";

    dic.forEach(servicio => {
        tabla.innerHTML += `
        <tr>
        <td>${servicio.id}</td>
        <td>${servicio.nombre}</td>
        <td>${servicio.descripcion}</td>
        <td>${servicio.valor}</td>
        <td>${servicio.puntos}</td>
        </tr>

        `
    });
}

function imprimirCliente(dic){
    let tabla = document.querySelector("#tabla-clientes");
    tabla.innerHTML = "";

    dic.forEach(cliente => {
        tabla.innerHTML += `
        <tr>
        <td>${cliente.identificacion}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        </tr>

        `
    });
}