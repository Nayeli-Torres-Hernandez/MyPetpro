//Aquí vamos a guardar los datos de los empleados:
var empleados = [];

function guardarEmpleado()
{
    var idPersona = 0;
    var idEmpleado = 0;
    var nombre = $("#txtNombre").val();
    var apellidoPaterno = $("#txtaPaterno").val();
    var apellidoMaterno = $("#txtaMaterno").val();
    var fechaNacimiento = $("#txtFechaNacimiento").val();
    var tel1 = $("#txtTel1").val();
    var tel2 = $("#txtTel2").val();
    var calle = $("#txtCalle").val();
    var numero = $("#txtNo").val();
    var colonia = $("#txtColonia").val();
    var cp = $("#txtCP").val();
    var ciudad = $("#txtCiudad").val();
    var estado = $("#txtEstado").val();
    var correo = $("#txtCorreoE").val();
    var contrasenia = $("#txtContrasenia").val();

    //Revisamos si la caja de texto del código tiene un valor:
    if ($("#txtIdPersona").val().length > 0)
    {
        //Asignamos el codigo = 0   
        idPersona = parseInt($("#txtIdPersona").val());
        idEmpleado = parseInt($("#txtIdEmpleado").val());
    }

    $.ajax({
        async: true,
        type: "POST",
        url: "rest/empleado/save",
        data: {
            idPersona: idPersona,
            idEmpleado: idEmpleado,
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            fechaNacimiento: fechaNacimiento,
            tel1: tel1,
            tel2: tel2,
            calle: calle,
            numero: numero,
            colonia: colonia,
            cp: cp,
            ciudad: ciudad,
            estado: estado,
            correo: correo,
            contrasenia: contrasenia
        }
    }).done(function (data) {
        if (data.exception != null)
        {
            Swal.fire("La operación no pudo ser completada",
                    data.exception,
                    "error");
        } else
        {
            $("#txtIdPersona").val(data.id);
            $("#txtIdEmpleado").val(data.Empleado.id);
            if (data.Empleado.estatus == 1) {
                $("#chbStatus").prop("checked", true);
            } else {
                $("#chbStatus").prop("checked", false);
            }
            Swal.fire("Operación realizada con éxito",
                    "Los datos del empleado fueron guardados correctamente.",
                    "success");
            refrescarTablaEmpleados();

        }
    });
}
/**
 * Inserta un empleado en el arreglo JSON empleados.
 * @param {type} p
 * @returns {undefined}
 */
function insertarEmpleado(e)
{
    empleados.push(e);
    $("#txtCodigoEmpleado").val(e.id);
    Swal.fire('Movimiento realizado',
            'Registro agregado correctamente',
            'success');
}

/**
 * Modifica los datos de un empleado existente.
 * @param {type} p
 * @returns {undefined}
 */
function modificarEmpleado(e)
{
    //Primero buscamos la posicion del proveedor con base en su codigo:
    var pos = buscarPosicionEmpleado(e.id);
    //Revisamos que sea una posición válida:
    if (pos >= 0)
    {
        //Guardamos el nuevo objeto en dicha posición:
        empleados[pos] = e;
        Swal.fire('Movimiento realizado',
                'Registro modificado correctamente',
                'success');
    } else
    {
        Swal.fire('Error al realizar movimiento',
                'Se encontro un error de integridad, contacte al área de sistemas',
                'error');
    }
}

function eliminarEmpleado()
{
    var idPersona = 0;

    if ($("#txtIdPersona").val().length > 0)
    {
        idPersona = $("#txtIdPersona").val();
    }

    $.ajax({
        async: true,
        type: "POST",
        url: "rest/empleado/delete",
        data: {
            idPersona: idPersona
        }
    }).done(function (data) {
        if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else {
            Swal.fire("Operación realizada con éxito",
                    "El registro se eliminó correctamente.",
                    "success");
            refrescarTablaEmpleados();
            limpiarCamposDetalleEmpleado();
        }
    });
}

/**
 * Busca un empleado por su codigo dentro del arreglo
 * JSON de empleados.
 * @param {type} codigo
 * @returns {undefined}
 */
function buscarPosicionEmpleado(id)
{
    //Recorremos el arreglo para buscar el codigo del proveedor
    //correspondiente y devolver la posición:
    for (var i = 0; i < empleados.length; i++)
    {
        //Si el codigo buscado es igual al codigo del proveedor en la posición i,
        //devolvemos el valor de i:
        if (id == empleados[i].id)
        {
            return i;
        }
    }
    //Si llegamos a este punto, significa que el codigo no existe y entonces,
    //retornamos el valor de -1.
    return -1;
}

/**
 * Actualiza el contenido de la tabla de proveedores
 * con los objetos contenidos en el arreglo JSON empleados.
 * @returns {undefined}
 */
function refrescarTablaEmpleados()
{
    var contenidoE = '';
    $.ajax({
        type: "GET",
        url: "rest/empleado/getAll"
    }).done(function (data) {
        if (data.exception != null) {
            Swal.fire("La operación no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="15" class="text-center">' +
                    '<img alt="" src="media/img/cargando.png" style="height: 100px"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento, no tienes empleados en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '/<tr>';
            $("#tbodyEmpleados").html(contenido);
            return;
        } else {
            empleados = data;
            for (var i = 0; i < empleados.length; i++)
            {
                contenidoE = contenidoE + '<tr>' +
                        '<td>' + empleados[i].Empleado.nombre + '</td>' +
                        '<td>' + empleados[i].Empleado.apellidoPaterno + '</td>' +
                        '<td>' + empleados[i].Empleado.apellidoMaterno + '</td>' +
                        '<td>' + empleados[i].Empleado.fechaNacimiento + '</td>' +
                        '<td>' + empleados[i].Empleado.tel1 + '</td>' +
                        '<td>' + empleados[i].Empleado.tel2 + '</td>' +
                        '<td>' + empleados[i].Empleado.calle + '</td>' +
                        '<td>' + empleados[i].Empleado.numero + '</td>' +
                        '<td>' + empleados[i].Empleado.colonia + '</td>' +
                        '<td>' + empleados[i].Empleado.cp + '</td>' +
                        '<td>' + empleados[i].Empleado.ciudad + '</td>' +
                        '<td>' + empleados[i].Empleado.estado + '</td>' +
                        '<td>' + empleados[i].correo + '</td>' +
                        '<td>' + empleados[i].Empleado.estatus + '</td>' +
                        '<td><a href=# class="text-info" onclick="mostrarDetalleEmpleado(' + i + ')"><i class="fa fa-eye"></i></a></td>' +
                        '</tr>';
            }
            $("#tbodyEmpleados").html(contenidoE);
        }
    });

}

function limpiarCamposDetalleEmpleado()
{
    $("#txtIdEmpleado").val("");
    $("#txtIdPersona").val("");
    $("#txtNombre").val("");
    $("#txtaPaterno").val("");
    $("#txtaMaterno").val("");
    $("#txtFechaNacimiento").val("");
    $("#txtTel1").val("");
    $("#txtTel2").val("");
    $("#txtCalle").val("");
    $("#txtNo").val("");
    $("#txtColonia").val("");
    $("#txtCP").val("");
    $("#txtCiudad").val("");
    $("#txtEstado").val("");
    $("#txtCorreoE").val("");
    $("#txtContrasenia").val("");
    $("#chbStatus").prop("checked", false);
}


function mostrarDetalleEmpleado(pos)
{
    var e = empleados[pos];

    $("#txtIdEmpleado").val(e.id);
    $("#txtIdPersona").val(e.Empleado.id);
    $("#txtNombre").val(e.Empleado.nombre);
    $("#txtaPaterno").val(e.Empleado.apellidoPaterno);
    $("#txtaMaterno").val(e.Empleado.apellidoMaterno);
    $("#txtFechaNacimiento").val(e.Empleado.fechaNacimiento);
    $("#txtTel1").val(e.Empleado.tel1);
    $("#txtTel2").val(e.Empleado.tel2);
    $("#txtCalle").val(e.Empleado.calle);
    $("#txtNo").val(e.Empleado.numero);
    $("#txtColonia").val(e.Empleado.colonia);
    $("#txtCP").val(e.Empleado.cp);
    $("#txtCiudad").val(e.Empleado.ciudad);
    $("#txtEstado").val(e.Empleado.estado);
    $("#txtCorreoE").val(e.correo);
    //$("#txtContrasenia").val(e.contrasenia);
    if (e.Empleado.estatus == 1)
    {
        $("#chbStatus").prop("checked", true);
        $("#lblStatus").html("Activo");
    } else
    {
        $("#chbStatus").prop("checked", false);
        $("#lblStatus").html("Inactivo");
    }
}

function ocultarSeccionDetalleEmpleado() {
    $("#divDetalleEmpleado").hide();
    $("#divCatalogoEmpleado").removeClass("col-sm-9");
    $("#divCatalogoEmpleado").addClass("col-sm-12");
}

function mostrarSeccionDetalleEmpleados() {
    $("#divDetalleEmpleado").show();
    $("#divCatalogoEmpleado").removeClass("col-sm-12");
    $("#divCatalogoEmpleado").addClass("col-sm-9");
}