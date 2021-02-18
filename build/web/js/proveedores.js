var proveedores = [];


function guardarProveedor()
{

    var idRepresentante = 0;
    var idProveedor = 0;
    var nombre = $("#txtNombre").val();
    var apellidoPaterno = $("#txtApellidoPaterno").val();
    var apellidoMaterno = $("#txtApellidoMaterno").val();
    var rfc = $("#txtRFC").val();
    var razonSocial = $("#txtRazonSocial").val();
    var tel1 = $("#txtTel1").val();
    var calle = $("#txtCalle").val();
    var numero = $("#txtNumero").val();
    var colonia = $("#txtColonia").val();
    var cp = $("#txtCp").val();
    var ciudad = $("#txtCiudad").val();
    var estado = $("#txtEstado").val();


    if ($("#txtIdProveedor").val().length > 0)
    {
        idProveedor = $("#txtIdProveedor").val();
        idRepresentante = $("#txtIdRepresentante").val();
    }

    $.ajax({
        async: true,
        type: "POST",
        url: "rest/proveedor/save",
        data: {
            idRepresentante: idRepresentante,
            idProveedor: idProveedor,
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            rfc: rfc,
            razonSocial: razonSocial,
            tel1: tel1,
            calle: calle,
            numero: numero,
            colonia: colonia,
            cp: cp,
            ciudad: ciudad,
            estado: estado
        }
    }).done(function (data) {

        if (data.exception != null)
        {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else
        {
            $("#txtIdProveedor").val(data.Proveedor.id);
            $("#txtIdRepresentante").val(data.id);
            Swal.fire("Operacion Realizada con Exito",
                    "Los datos del proveedor fueron guardados correctamente",
                    "success");
            refrescarTablaProveedores();
        }
    });
}






function insertarProveedor(p)
{
    proveedores.push(p);
    $("#txtIdProveedor").val(p.codigo);
    Swal.fire('Movimiento realizado',
            'Registro agregado correctamente',
            'success');
}

function modificarProveedor(p)
{
    //Primero buscamos la posicion del proveedor con base en su codigo:
    var pos = buscarPosicionProveedor(p.codigo);

    //Revisamos que sea una posición válida:
    if (pos >= 0)
    {
        //Guardamos el nuevo objeto en dicha posición:
        proveedores[pos] = p;
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

function eliminarProveedor()
{
    var idPersona=0;
    
    if ($("#txtIdRepresentante").val().length > 0)
    {
        idPersona = $("#txtIdRepresentante").val();
   
    }
    
     $.ajax({
        async : true,
        type  : "POST",
        url   : "rest/proveedor/delete",
        data  : {
            idPersona : idPersona
            
        }
    }).done(function(data){
        if (data.exception != null)
        {
            Swal.fire("La operación no pudo ser completada",
            data.exception,
            "error");
        }
        else
        {       
            Swal.fire("Operación realizada con éxito",
                      "El registro se eliminó correctamente.",
                      "success");
            refrescarTablaProveedores();
            limpiarCamposDetalleProveedor();
        }
        
    });
}


function buscarPosicionProveedor(codigo)
{
    //Recorremos el arreglo para buscar el codigo del proveedor
    //correspondiente y devolver la posición:
    for (var i = 0; i < proveedores.length; i++)
    {
        //Si el codigo buscado es igual al codigo del proveedor en la posición i,
        //devolvemos el valor de i:
        if (codigo == proveedores[i].codigo)
        {
            return i;
        }
    }
    //Si llegamos a este punto, significa que el codigo no existe y entonces,
    //retornamos el valor de -1.
    return -1;
}


function refrescarTablaProveedores()
{
    var contenido = '';
    $.ajax({
        type: "GET",
        url: "rest/proveedor/getAll"
    })
            .done(function (data) {
                if (data.exception != null)
                {
                    Swal.fire("La operación no pudo ser completada",
                            data.exception,
                            "error");
                } else if (data.length < 1)
                {
                    contenido = '<tr>' +
                            '<td colspan="9" class="text-center">' +
                            '<img alt="" src="media/img/1.jpg" style=height: 256px;" /><br> ' +
                            '<span class="text-danger font-weight-bold">' +
                            'por el momento,no tienes proveedores' +
                            '</span>' +
                            '</td>' +
                            '</tr>';
                    $("#tbodyProveedores").html(contenido);
                    return;
                } else
                {
                    proveedores = data;
                    //Recorremos el arreglo JSON para ir generando el
                    //contenido de la tabla:
                    for (var i = 0; i < proveedores.length; i++)
                    {

                        contenido = contenido + '<tr>' +
                                '<td>' + proveedores[i].Proveedor.nombre + '</td>' +
                                '<td>' + proveedores[i].Proveedor.apellidoPaterno + '</td>' +
                                '<td>' + proveedores[i].Proveedor.apellidoMaterno + '</td>' +
                                '<td>' + proveedores[i].rfc + '</td>' +
                                '<td>' + proveedores[i].razonSocial + '</td>' +
                                '<td>' + proveedores[i].Proveedor.tel1 + '</td>' +
                                '<td>' + proveedores[i].Proveedor.calle + '</td>' +
                                '<td>' + proveedores[i].Proveedor.numero + '</td>' +
                                '<td>' + proveedores[i].Proveedor.colonia + '</td>' +
                                '<td>' + proveedores[i].Proveedor.cp + '</td>' +
                                '<td>' + proveedores[i].Proveedor.ciudad + '</td>' +
                                '<td>' + proveedores[i].Proveedor.estado + '</td>' +
                                '<td>' + proveedores[i].Proveedor.estatus + '</td>' +
                                '<td><a href="#" class="text-info" onclick="mostrarDetalleProveedor(' + i + ')"><i class="fa fa-eye"></i></a></td>' + '</tr>';
                    }
                    $("#tbodyProveedores").html(contenido);
                }
            });
}


function limpiarCamposDetalleProveedor()
{
    $("#txtIdRepresentante").val("");
    $("#txtIdProveedor").val("");
    $("#txtNombre").val("");
    $("#txtApellidoPaterno").val("");
    $("#txtApellidoMaterno").val("");
    $("#txtRFC").val("");
    $("#txtRazonSocial").val("");
    $("#txtTel1").val("");
    $("#txtCalle").val("");
    $("#txtNumero").val("");
    $("#txtColonia").val("");
    $("#txtCp").val("");
    $("#txtCiudad").val("");
    $("#txtEstado").val("");
    $("#chbStatus").prop("checked", false);
}


function mostrarDetalleProveedor(pos)
{
    var p = proveedores[pos];


    $("#txtIdRepresentante").val(p.Proveedor.id);
    $("#txtIdProveedor").val(p.id);
    $("#txtNombre").val(p.Proveedor.nombre);
    $("#txtApellidoPaterno").val(p.Proveedor.apellidoPaterno);
    $("#txtApellidoMaterno").val(p.Proveedor.apellidoMaterno);
    $("#txtRFC").val(p.rfc);
    $("#txtRazonSocial").val(p.razonSocial);
    $("#txtTel1").val(p.Proveedor.tel1);
    $("#txtCalle").val(p.Proveedor.calle);
    $("#txtNumero").val(p.Proveedor.numero);
    $("#txtColonia").val(p.Proveedor.colonia);
    $("#txtCp").val(p.Proveedor.cp);
    $("#txtCiudad").val(p.Proveedor.ciudad);
    $("#txtEstado").val(p.Proveedor.estado);


    if (p.Proveedor.status == 1)
    {
        $("#chbStatus").prop("checked", true);
        $("#lblStatus").html("Activo");
    } else
    {
        $("#chbStatus").prop("checked", false);
        $("#lblStatus").html("Eliminado");

    }

}

function ocultarSeccionDetalleProveedor() {
    $("#divDetalleProveedor").hide();
    $("#divCatalogoProveedores").removeClass("col-sm-9");
    $("#divCatalogoProveedores").addClass("col-sm-12");
}

function mostrarSeccionDetalleProveedor() {
    $("#divDetalleProveedor").show();
    $("#divCatalogoProveedores").removeClass("col-sm-12");
    $("#divCatalogoProveedores").addClass("col-sm-9");
}


                        