//Aquí vamos a guardar los datos de los productos:
var productos = [];
//Aquí vamos a controlar el código interno del producto:
//var codigo_interno_auto = 10;

function guardarMercancia()
{
    var idProducto = 0;
    var idMercancia = 0;
    var nombre = $("#txtNombre").val();
    var codigoBarras = $("#txtCodigoBarras").val();
    var marca = $("#txtMarca").val();
    var modelo = $("#txtModelo").val();
    var descripcion = $("#txtDescripcion").val();
    var existencias = $("#txtExistencias").val();
    var precioCompra = parseFloat($("#txtPrecioCompra").val());
    var fotografia = $("#txtBase64").val();


    //Revisamos si la caja de texto del código interno tiene un valor:
    if ($("#txtIdProducto").val().length > 0)
    {
        //Asignamos el ID = 0
        idProducto = parseInt($("#txtIdProducto").val());
        idMercancia = parseInt($("#txtIdMercancia").val());
    }

    $.ajax({
        async: true,
        type: "POST",
        url: "rest/mercancia/save",
        data: {
            idProducto: idProducto,
            idMercancia: idMercancia,
            codigoBarras: codigoBarras,
            descripcion: descripcion,
            nombre: nombre,
            existencias: existencias,
            modelo: modelo,
            marca: marca,
            precioCompra: precioCompra,
            foto: fotografia
        }

    }).done(function (data) {
        if (data.exception != null)
        {
            Swal.fire("La operación no pudo ser completada",
                    data.exception,
                    "error");
        } else
        {
            $("#txtIdProducto").val(data.producto.id);
            $("#txtIdMercancia").val(data.id);
            $("#txtPrecioVenta").val(data.producto.precioVenta);
            Swal.fire("Operación realizada con éxito",
                    "Los datos de la mercancía fueron guardados correctamente.",
                    "success");
            refrescarTablaMercancia();
        }
    });
}
    
/**
 * Inserta un producto en el arreglo JSON productos.
 * @param {type} p
 * @returns {undefined}
 */
function insertarProducto(p)
{
    productos.push(p);
    $("#txtCodigoInterno").val(p.id);
    Swal.fire('Movimiento realizado',
            'Registro agregado correctamente',
            'success');
}

/**
 * Modifica los datos de un producto existente.
 * @param {type} p
 * @returns {undefined}
 */
function modificarProducto(p)
{
//Primero buscamos la posicion del producto con base en su id:
    var pos = buscarPosicionProducto(p.id);
    //Revisamos que sea una posición válida:
    if (pos >= 0)
    {
//Guardamos el nuevo objeto en dicha posición:
        productos[pos] = p;
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

/*function eliminarMercancia()
 {
 //Recuperamos el ID del producto:
 var idProducto = $("#txtIdProducto").val();
 var pos = buscarPosicionProducto(idProducto);
 if (pos >= 0)
 {
 productos[pos].producto.status = 0;
 $("#chbStatus").prop("checked", false);
 //alert('Producto eliminado correctamente.');
 Swal.fire('Movimiento realizado',
 'Registro eliminado correctamente',
 'success');
 refrescarTablaMercancia();
 limpiarCamposDetalleMercancia()();
 }
 
 }*/

/*function eliminarMercancia()
 {
 var idProducto = 0;
 if ($("#txtIdProducto").val().length > 0)
 {
 idProducto = $("#txtIdProducto").val();
 }
 $.ajax({
 async: true,
 type: "POST",
 url: "rest/mercancia/delete",
 data: {
 idPersona: idPersona
 }
 }).done(function(data)){
 if (data.exception != null)
 {
 Swal.fire("La operación no pudo ser completada",
 data.exception,
 "error");
 } else
 {
 Swal.fire("Operación realizada con éxito",
 "Registro eliminado correctamente",
 "success");
 refrescarTablaMercancia();
 limpiarCamposDetalleMercancia();
 }
 }
 }*/

function eliminarMercancia()
{
    var idProducto = 0;

    if ($("#txtIdProducto").val().length > 0)
    {
        idProducto = $("#txtIdProducto").val();

    }

    $.ajax({
        async: true,
        type: "POST",
        url: "rest/mercancia/delete",
        data: {
            idProducto: idProducto
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
            refrescarTablaMercancia();
            limpiarCamposDetalleMercancia();
        }
    });
}

/**
 * Busca un producto por su ID dentro del arreglo
 * JSON de productos.
 * @param {type} id
 * @returns {undefined}
 */
function buscarPosicionProducto(id)
{
//Recorremos el arreglo para buscar el ID del producto
//correspondiente y devolver la posición:
    for (var i = 0; i < productos.length; i++)
    {
//Si el id buscado es igual al ID del producto en la posición i,
//devolvemos el valor de i:
        if (id == productos[i].id)
        {
            return i;
        }
    }
//Si llegamos a este punto, significa que el ID no existe y entonces,
//retornamos el valor de -1.
    return -1;
}

/**
 * Actualiza el contenido de la tabla de productos
 * con los objetos contenidos en el arreglo JSON productos.
 * @returns {undefined}
 */
function refrescarTablaMercancia()
{
    var contenidoM = '';
    $.ajax({
        type: "GET",
        url: "rest/mercancia/getAll"
    }).done(function (data) {
        if (data.exception != null) {
            Swal.fire("La operación no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="9" class="text-center">' +
                    '<img alt="" src="" style="height: 256px"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento, no tienes productos en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '/<tr>';
            $("#tbodyMercancia").html(contenido);
            return;
        } else {
            mercancias = data;
            for (var i = 0; i < mercancias.length; i++)
            {
                contenidoM = contenidoM + '<tr>' +
                        '<td>' + mercancias[i].codigoBarras + '</td>' +
                        '<td>' + mercancias[i].producto.nombre + '</td>' +
                        '<td>' + mercancias[i].producto.existencias + '</td>' +
                        '<td>' + mercancias[i].marca + '</td>' +
                        '<td>' + mercancias[i].modelo + '</td>' +
                        '<td>' + mercancias[i].descripcion + '</td>' +
                        '<td>' + mercancias[i].producto.precioCompra + '</td>' +
                        '<td>' + mercancias[i].producto.precioVenta + '</td>' +
                        '<td>' + mercancias[i].producto.status + '</td>' +
                        '<td><a href=# class="text-info" onclick="mostrarDetalleMercancia(' + i + ')"><i class="fa fa-eye"></i></a></td>' +
                        '</tr>';
            }
            $("#tbodyMercancia").html(contenidoM);
        }
    });

}

function limpiarCamposDetalleMercancia()
{
    $("#txtIdProducto").val("");
    $("#txtIdMercancia").val("");
    $("#txtCodigoBarras").val("");
    $("#txtNombre").val("");
    $("#txtExistencias").val("");
    $("#txtMarca").val("");
    $("#txtModelo").val("");
    $("#txtDescripcion").val("");
    $("#txtPrecioCompra").val("");
    $("#txtPrecioVenta").val("");
    $("#txtBase64").val("");
    $("#imgFoto").attr("src", "");
    $("#chbStatus").prop("checked", false);
}

function cargarFotografia(objetoInputFile)
{
    if (objetoInputFile.files && objetoInputFile.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e)
        {
            var fotoB64 = e.target.result;
            $("#imgFoto").attr("src", fotoB64);
            $("#txtBase64").val(fotoB64.substring(22, fotoB64.lengt));
        };
        reader.readAsDataURL(objetoInputFile.files[0]);
    }
}

function mostrarDetalleMercancia(pos)
{
    var m = mercancias[pos];

    $("#txtIdMercancia").val(m.id);
    $("#txtIdProducto").val(m.producto.id);
    $("#txtCodigoBarras").val(m.codigoBarras);
    $("#txtNombre").val(m.producto.nombre);
    $("#txtMarca").val(m.marca);
    $("#txtModelo").val(m.modelo);
    $("#txtDescripcion").val(m.descripcion);
    $("#txtPrecioCompra").val(m.producto.precioCompra);
    $("#txtPrecioVenta").val(m.producto.precioVenta);
    $("#txtExistencias").val(m.producto.existencias);
    $("#imgFoto").attr("src", "data:image/png; base64," + m.producto.foto);
    $("#txtBase64").val(m.producto.foto);


    if (m.producto.status == 1)
    {
        $("#chbStatus").prop("checked", true);
        $("#lblStatus").html("Activo");
    } else
    {
        $("#chbStatus").prop("checked", false);
        $("#lblStatus").html("Inactivo");
    }
}

function ocultarSeccionDetalleMercancia() {
    $("#divDetalleProducto").hide();
    $("#divCatalogoProductos").removeClass("col-sm-9");
    $("#divCatalogoProductos").addClass("col-sm-12");
}

function mostrarSeccionDetalleMercancia() {
    $("#divDetalleProducto").show();
    $("#divCatalogoProductos").removeClass("col-sm-12");
    $("#divCatalogoProductos").addClass("col-sm-9");
}