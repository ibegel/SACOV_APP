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
   
function Limpiar() {
    var limpiar = document.getElementsByClassName("limpiar");
    var nlimpiar = limpiar.length;
    for (var i = 0; i < nlimpiar; i++) {
        limpiar[i].value = "";
    }
}

function AbrirModal(id) {
    Limpiar();
    if (id == 0) {
        document.getElementById("tclave").value = "D-";
        document.getElementById("lbltitulo").innerHTML = "Agregar Doctor";
    }
    else {
        fetch("http://192.168.100.10:8081/api/Usuario?id_Usuario=" + id)
            .then(res => res.json())
            .then(res => {
                document.getElementById("tid_Usuario").value = res.id_Usuario;
                document.getElementById("tnombre").value = res.nombre;
                document.getElementById("tclave").value = res.clave;
                document.getElementById("cborango").value = res.rango;
            });
        document.getElementById("lbltitulo").innerHTML = "Editar Doctor";
    }
}

function Guardar() {
    if (confirm("Desea Guardar los Cambios") == 1) {
        var jid = document.getElementById("tid_Usuario").value;
        var jclave = document.getElementById("tclave").value;
        var jrango = document.getElementById("cborango").value;
        var jnombre = document.getElementById("tnombre").value;
        if (jid == null || jid == 0) {
            fetch("http://192.168.100.10:8081/api/Usuario")
                .then(res => res.json())
                .then(res => {
                    jid = res.length + 1;
                });
        }
        fetch("http://192.168.100.10:8081/api/Usuario",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    "Id_usuario": jid,
                    "Clave": jclave,
                    "Rango": jrango,
                    "Nombre": jnombre
                })
            }).then(res => res.json())
            .then(res => {
                if (res == 1) {
                    alert("Se ejecuto correctamente");
                    listarUsuario();
                    document.getElementById("btnClose").click();
                }
                else {
                    alert("Error");
                }
            })
    }

}



