window.onload = function () {
    listarUsuario();
}

function listarUsuario() {
    fetch("http://192.168.1.126:8082/api/Usuario")
        .then(res => res.json())
        .then(res => {
            crearListado(res);
        });
}

function crearListado(res) {
    var contenido = "";
    contenido += "<table class='table table-hover table-dark'>";
    contenido += "<thead class='thead-dark'>"
    contenido += "<tr>";
    contenido += "<td>Id_Usuario</td>";
    contenido += "<td>Clave</td>";
    contenido += "<td>Rango</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Operaciones</td>";
    contenido += "</tr>";
    contenido += "</thead>"
    contenido += "<tbody>";
    for (var i = 0; i < res.length; i++) {
        contenido += "<tr>";
        contenido += "<td>" + res[i].id_Usuario + "</td>";
        contenido += "<td>" + res[i].clave + "</td>";
        contenido += "<td>" + res[i].rango + "</td>";
        contenido += "<td>" + res[i].nombre + "</td>";
        contenido += "<td>";
        contenido += "<button onclick='AbrirModal(" + res[i].id_Usuario + ")' type='button' class='btn btn-outline-light btn-sm' data-bs-toggle='modal' data-bs-target='#exampleModal'>Editar</button>";
        contenido += "<button onclick='Eliminar(" + res[i].id_Usuario + ")' type='button' class='btn btn-outline-light btn-sm'>Eliminar</button>";
        contenido += "</td>";

        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("divTabla").innerHTML = contenido;
}