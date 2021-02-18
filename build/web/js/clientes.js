var clientes = [
    {
        id: 1,
        Nombre: "Abel",
        Apaterno: "Mendoza",
        Amaterno: "Vera",
        Telefono: "7461017212",
        Correo: "abel@gmail.com",
        FechaN: "2001-05-10",
        Contraseña: "RMC07",
        Status: 1
    },
    {
        id: 2,
        Nombre: "Nayeli",
        Apaterno: "Torres",
        Amaterno: "Hernandez",
        Telefono: "77461212",
        Correo: "Nay@gmail.com",
        FechaN: "2001-03-08",
        Contraseña: "Nay01ASA23",
        Status: 1
    },
    {
        id: 3,
        Nombre: "Carlos",
        Apaterno: "Perez",
        Amaterno: "Cruz",
        Telefono: "4771627821",
        Correo: "CP123@gmail.com",
        FechaN: "1992-12-18",
        Contraseña: "AmericaCampeon12345",
        Status: 1
    },
    {
        id: 4,
        Nombre: "Juan",
        Apaterno: "Mendez",
        Amaterno: "Uscanga",
        Telefono: "7461102212",
        Correo: "Uscanga@gmail.com",
        FechaN: "1996-02-03",
        Contraseña: "FEY10",
        Status: 1
    },
    {
        id: 5,
        Nombre: "Cristian",
        Apaterno: "Aguayo",
        Amaterno: "Estrada",
        Telefono: "4771027323",
        Correo: "AAguayFay@gmail.com",
        FechaN: "2001-01-11",
        Contraseña: "CienPorcientoAMERICA",
        Status: 1
    },
    {
        id: 6,
        Nombre: "Kevin",
        Apaterno: "Uscanga",
        Amaterno: "Cruz",
        Telefono: "7461123212",
        Correo: "Cruzito@gmail.com",
        FechaN: "2001-08-29",
        Contraseña: "Lidia12345",
        Status: 1
    },
    {
        id: 7,
        Nombre: "Arturo",
        Apaterno: "Torres",
        Amaterno: "Jimenez",
        Telefono: "7461122312",
        Correo: "Jimeneez@gmail.com",
        FechaN: "2001-04-25",
        Contraseña: "FreeFire2001",
        Status: 1
    },
    {
        id: 8,
        Nombre: "Juan",
        Apaterno: "Viveros",
        Amaterno: "Garcia",
        Telefono: "7461238745",
        Correo: "mANUEL12@gmail.com",
        FechaN: "2001-06-13",
        Contraseña: "RM45CYTY",
        Status: 1
    },
    {
        id: 9,
        Nombre: "Fernando",
        Apaterno: "Garcia",
        Amaterno: "Smit",
        Telefono: "7467856122",
        Correo: "Smit12@gmail.com",
        FechaN: "2001-12-12",
        Contraseña: "SMIT12434",
        Status: 1
    },
    {
        id: 10,
        Nombre: "Jared",
        Apaterno: "Cruz",
        Amaterno: "Amaro",
        Telefono: "7721235672",
        Correo: "FCBarcelona@gmail.com",
        FechaN: "2001-07-18",
        Contraseña: "FCBARCELONA10",
        Status: 1
    }
];
var codigo_cliente_auto = 10;


function guardarCliente()
{
    //Creamos un nuevo objeto y le asignamos propiedades y valores 
    //obtenidos desde las cajas de texto:
    var cliente = {
        id: 0,
        Nombre: $("#txtNombre").val(),
        Apaterno: $("#txtApaterno").val(),
        Amaterno: $("#txtAmaterno").val(),
        Telefono: $("#txtTelefono").val(),
        Correo: $("#txtCorreo").val(),
        FechaN: $("#txtFechaN").val(),
        Contraseña: $("#txtContraseña").val(),
        Status: 1
    };
    if ($("#txtCodigoCliente").val().length > 0)
    {
        //Asignamos el ID = 0
        cliente.id = parseInt($("#txtCodigoCliente").val());
    }
    if (cliente.id == 0)
    {
        //Incrementamos el codigo interno:
        codigo_cliente_auto++;

        //Asignamos el codigo interno actual:
        cliente.id = codigo_cliente_auto;

        insertarCliente(cliente);
        refrescarTablaCliente();
    } else
    {
        modificarCliente(cliente);
        refrescarTablaCliente();
    }
}

function insertarCliente(p)
{
    clientes.push(p);
    $("#txtCodigoCliente").val(p.id);
    Swal.fire('Movimiento realizado',
            'Registro agregado correctamente',
            'success');
}


function modificarCliente(p)
{
    //Primero buscamos la posicion del producto con base en su id:
    var pos = buscarPosicionCliente(p.id);

    //Revisamos que sea una posición válida:
    if (pos >= 0)
    {
        //Guardamos el nuevo objeto en dicha posición:
        clientes[pos] = p;
        Swal.fire('Movimiento realizado',
                'Registro modificado correctamente',
                'success');
    } else
    {
        //alert('No se encontro un producto con ese ID: Error de integridad.');
        Swal.fire('Error al realizar movimiento',
                'Se encontro un error de integridad, contacte al área de sistemas',
                'error');
    }
}




function eliminarCliente()
{
    //Recuperamos el ID del producto:
    var id = $("#txtCodigoCliente").val();
    var pos = buscarPosicionCliente(id);

    if (pos >= 0)
    {
        clientes[pos].Status = 0;
        $("#chbStatus").prop("checked", false);
        //alert('Producto eliminado correctamente.');
        Swal.fire('Movimiento realizado',
                'Registro eliminado correctamente',
                'success');
        refrescarTablaCliente();
        limpiarCamposDetalleCliente();
    }

}



function buscarPosicionCliente(id)
{
    //Recorremos el arreglo para buscar el ID del producto
    //correspondiente y devolver la posición:
    for (var i = 0; i < clientes.length; i++)
    {
        //Si el id buscado es igual al ID del producto en la posición i,
        //devolvemos el valor de i:
        if (id == clientes[i].id)
        {
            return i;
        }
    }
    //Si llegamos a este punto, significa que el ID no existe y entonces,
    //retornamos el valor de -1.
    return -1;
}






function refrescarTablaCliente()
{
    var contenido = '';

    //Recorremos el arreglo JSON para ir generando el
    //contenido de la tabla:
    for (var i = 0; i < clientes.length; i++)
    {
        contenido = contenido + '<tr>' +
                '<td>' + clientes[i].id + '</td>' +
                '<td>' + clientes[i].Nombre + '</td>' +
                '<td>' + clientes[i].Apaterno + '</td>' +
                '<td>' + clientes[i].Amaterno + '</td>' +
                '<td>' + clientes[i].Telefono + '</td>' +
                '<td>' + clientes[i].Correo + '</td>' +
                '<td>' + clientes[i].FechaN + '</td>' +
                '<td>' + clientes[i].Contraseña + '</td>' +
                '<td>' + clientes[i].Status + '</td>' +
                '<td><button class="btn btn-sm btn-primary" onclick="mostrarDetalleCliente(' + i + ')">Ver Detalle</button></td>' +
                '</tr>';
    }
    $("#tbodyClientes").html(contenido);
}






function limpiarCamposDetalleCliente()
{
    $("#txtCodigoCliente").val("");
    $("#txtNombre").val("");
    $("#txtApaterno").val("");
    $("#txtAmaterno").val("");
    $("#txtTelefono").val("");
    $("#txtCorreo").val("");
    $("#txtFechaN").val("");
    $("#txtContraseña").val("");
    $("#chbStatus").prop("checked", false);
}


function mostrarDetalleCliente(pos)
{
    var p = clientes[pos];

    $("#txtCodigoCliente").val(p.id);
    $("#txtNombre").val(p.Nombre);
    $("#txtApaterno").val(p.Apaterno);
    $("#txtAmaterno").val(p.Amaterno);
    $("#txtTelefono").val(p.Telefono);
    $("#txtCorreo").val(p.Correo);
    $("#txtFechaN").val(p.FechaN);
    $("#txtContraseña").val(p.Contraseña);
    if (p.Status == 1)
    {
        $("#chbStatus").prop("checked", true);
    } else
    {
        $("#chbStatus").prop("checked", false);
    }

}

function ocultarSeccionDetalleCliente() {
    $("#divDetalleCliente").hide();
    $("#divCatalogoCliente").removeClass("col-sm-9");
    $("#divCatalogoCliente").addClass("col-sm-12");
}

function mostrarSeccionDetalleCliente() {
    $("#divDetalleCliente").show();
    $("#divCatalogoCliente").removeClass("col-sm-12");
    $("#divCatalogoCliente").addClass("col-sm-9");
}


