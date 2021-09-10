window.onload = function () {
    listarUsuario();
}

function listarUsuario() {
    fetch("http://192.168.1.103:8081/api/Agente")
        .then(res => res.json())
        .then(res => {
            for (var i = 0; i < res.length; i++) {
                crearListado(res,i);
            }
        });
}

function borrarlista()
{
    location.reload();
}

function crearListado(res,i) {
    var cuerpo = document.getElementById('tabla_cuerpo');
    var lista = document.createElement('tr');
    lista.setAttribute("id", "Entidades");
        lista.innerHTML = `
                <td>${res[i].id_Agente}</td>
                <td>${res[i].matricula}</td>
                <td>${res[i].grado}</td>
                <td>${res[i].nombre}</td>
                <td>${res[i].distintivo}</td>
                <td>
                    <button onclick='AbrirModal(${res[i].id_Agente})' type='button' class='btn btn-outline-dark btn-sm' data-bs-toggle='modal' data-bs-target='#exampleModal'>Editar</button>
                    <button onclick='Eliminar(${res[i].id_Agente})' type='button' class='btn btn-outline-dark btn-sm'>Eliminar</button>
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
        document.getElementById("lbltitulo").innerHTML = "Agregar Agente";
    }
    else {
        fetch("http://192.168.1.103:8081/api/Agente?id_Agente=" + id)
            .then(res => res.json())
            .then(res => {
                document.getElementById("tid_Agente").value = res.id_Agente;
                document.getElementById("tmatricula").value = res.matricula;
                document.getElementById("cbogrado").value = res.grado;
                document.getElementById("tnombre").value = res.nombre;
                document.getElementById("tdistintivo").value = res.distintivo;
            });
        document.getElementById("lbltitulo").innerHTML = "Editar Agente";
    }
}

function Guardar() {
    if (confirm("Desea Guardar los Cambios") == 1) {
        var jid = document.getElementById("tid_Agente").value;
        var jclave = document.getElementById("tmatricula").value;
        var jrango = document.getElementById("cbogrado").value;
        var jnombre = document.getElementById("tnombre").value;
        var jdistintivo = document.getElementById("tdistintivo").value;
        if (jid == null || jid == 0) {
            fetch("http://192.168.1.103:8081/api/Agente")
                .then(res => res.json())
                .then(res => {
                    //jid = res.length + 1;
                });
        }
        fetch("http://192.168.1.103:8081/api/Agente",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    "Id_Agente": jid,
                    "Matricula": jclave,
                    "Grado": jrango,
                    "Nombre": jnombre,
                    "Distintivo":jdistintivo
                })
            }).then(res => res.json())
            .then(res => {
                if (res == 1) {
                    alert("Se ejecuto correctamente");
                    document.getElementById("btnClose").click();
                    borrarlista();
                    
                }
                else {
                    alert("Error");
                }
            })
    }

    
}


function Eliminar(id) {
    if (confirm("Desea Borrar este elemento") == 1) {
        fetch("http://192.168.100.10:8081/api/Usuario?id_usuario" + id,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT'
            }).then(res => res.json())
            .then(res => {
                if (res == 1) {
                    alert("Se ejecuto correctamente");
                    document.getElementById("btnClose").click();
                    borrarlista();

                }
                else {
                    alert("Error");
                }
            })
    }
}


