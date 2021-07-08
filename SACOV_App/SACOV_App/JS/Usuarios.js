window.onload = function () {
    listarUsuario();
}

function listarUsuario() {
    fetch("http://192.168.100.10:8081/api/Usuario")
        .then(res => res.json())
        .then(res => {
            for (var i = 0; i < res.length; i++) {
                crearListado(res,i);
            }
        });
}

function crearListado(res,i) {
    var cuerpo = document.getElementById('tabla_cuerpo');
    var lista = document.createElement('tr');
    
        lista.innerHTML = `
                <td>${res[i].id_Usuario}</td>
                <td>${res[i].clave}</td>
                <td>${res[i].rango}</td>
                <td>${res[i].nombre}</td>
                <td>
                    <button onclick='AbrirModal(${res[i].id_Usuario})' type='button' class='btn btn-outline-dark btn-sm' data-bs-toggle='modal' data-bs-target='#exampleModal'>Editar</button>
                    <button onclick='Eliminar(${res[i].id_Usuario})' type='button' class='btn btn-outline-dark btn-sm'>Eliminar</button>
                </td>`;
        cuerpo.appendChild(lista);
}
   
