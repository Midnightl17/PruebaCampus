let clientes = [];
let LS = window.localStorage;


if (LS.getItem('clientes')) {
    clientes = JSON.parse(LS.getItem('clientes'));
}

imprimirTabla(clientes);

const inputBuscar = document.querySelector('#buscar-clientes');
inputBuscar.addEventListener('keyup', buscarClientes);

function buscarClientes() {
        if (isNaN(inputBuscar.value)) { 
            let busqueda = clientes.filter(function (cliente) {
                return (
                    cliente.apellidos.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||
                    cliente.nombres.toLowerCase().includes(inputBuscar.value.toLowerCase())
                );
            });

            imprimirTabla(busqueda);
        } else {
            let busqueda = clientes.filter(function (cliente) {
                return cliente.identificacion.includes(inputBuscar.value);
            });

            imprimirTabla(busqueda);
        }
    
}


function imprimirTabla(datos) {
    // Limpiar la tabla anterior
    const tabla = document.querySelector('#tabla-clientes');
    tabla.innerHTML = '';

    // Imprimir
    datos.forEach(cliente => {
        tabla.innerHTML += `
        <tr>
        <td>${cliente.identificacion}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        <td>${cliente.puntos}</td>
        </tr>
    `
    });
}