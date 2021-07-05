window.onload = function () {
    crearListado();
}

function crearListado()
{
    fetch("http://192.168.1.126:8082/api/Usuario")
        .then(res => res.json())
        .then(res => {
            crearListado(res);
        });
    document.getElementById("prueba").innerHTML = "<h2>" + res[1].id_Usuario + "</h2>";
   
}