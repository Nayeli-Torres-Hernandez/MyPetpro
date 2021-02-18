function login() {
    //Leemos lod valores de las cajas de texto y guardamos en variable
    //var nombre = document.getElementById("txtUsuario").value;
    var nombre = $("#txtUsuario").val();
    //var contrasenia =document.getElementById("txtContrasenia").value;
    var contrasenia = $("#txtPassword").val();

    if (nombre === "admin" && contrasenia === "admin123") {
        window.location.href = "inicio.html";

    }     
    if (nombre === "empleado" && contrasenia === "empleado"){
        window.location.href = "inicio.html";
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function cargarModuloProductos() {
    //Hacemos la petición Ajax para cargar de forma dinamica
    //el modulo de productos:
    $.ajax({
        url: "modulosAdmin/productos.html",
        context: document.body
    }).done(function (data) {
        //Aqui decidimos que hacer con la respuesta
        //que nos da el servidor:
        $("#divContenedorTODO").html(data);
        $("#divContenedorContactanos").html(" ");
        $("#divInicioOfertas").html(" ");
        $("#divContenedorQuienesSomos").html("");
    });
}

function cargarModuloProveedores() {
    $.ajax({
        url: "modulosAdmin/proveedores.html",
        context: document.body
    }).done(function (data) {
        $("#divContenedorTODO").html(data);
        $("#divContenedorContactanos").html(" ");
        $("#divInicioOfertas").html(" ");
        $("#divContenedorQuienesSomos").html("");
    });
}

function cargarModuloEmpleados() {
    $.ajax({
        url: "modulosAdmin/empleados.html",
        context: document.body
    }).done(function (data) {
        $("#divInicioOfertas").html(" ");
        $("#divContenedorContactanos").html(" ");
        $("#divContenedorTODO").html(data);
        $("#divContenedorQuienesSomos").html("");
    });
}

function cargarModuloMascotas() {
    $.ajax({
        url: "modulosAdmin/mascotas.html",
        context: document.body
    }).done(function (data) {
        $("#divInicioOfertas").html(" ");
        $("#divContenedorContactanos").html(" ");
        $("#divContenedorTODO").html(data);
        $("#divContenedorQuienesSomos").html("");
    });
}

function cargarModuloClientes() {
    $.ajax({
        url: "modulosCliente/clientes.html",
        context: document.body
    }).done(function (data) {
        $("#divInicioOfertas").html(" ");
        $("#divContenedorContactanos").html(" ");
        $("#divContenedorTODO").html(data);
        $("#divContenedorQuienesSomos").html("");
    });
}

function cargarHome() {
    $.ajax({
        url: "modulosCliente/ofertas.html",
        context: document.body
    }).done(function (data) {
        $("#divContenedorContactanos").html(" ");
        $("#divContenedorTODO").html(" ");
        $("#divInicioOfertas").html(data);
        $("#divContenedorQuienesSomos").html("");
    });
}

function cargarContactanos() {
    $.ajax({
        url: "modulosCliente/contactanos.html",
        context: document.body
    }).done(function (data) {
        $("#divContenedorContactanos").html(data);
        $("#divContenedorTODO").html(" ");
        $("#divInicioOfertas").html(" ");
        $("#divContenedorQuienesSomos").html(" ");
    });
}

function cargarQuienesSomos() {
    $.ajax({
        url: "modulosCliente/quienessomos.html",
        context: document.body
    }).done(function (data) {
        $("#divContenedorContactanos").html(" ");
        $("#divContenedorTODO").html(" ");
        $("#divInicioOfertas").html(" ");
        $("#divContenedorQuienesSomos").html(data);
    });
}