var mascotas = [];

function guardarAnimal()
{
    //Creamos un nuevo objeto y le asignamos propiedades y valores 
    //obtenidos desde las cajas de texto:
    var idProducto = 0;
    var idAnimal = 0;
    var nombre = $("#txtNombre").val();
    var especie = $("#txtEspecie").val();
    var raza = $("#txtRaza").val();
    var existencias = $("#txtExistencia").val();
    var fechaNacimiento = $("#txtFechaNac").val();
    var fechaLlegada = $("#txtFechaLlegada").val();
    var precioCompra = $("#txtPrecioCompra").val();
    if ($("#txtCodigoAnimal").val().length > 0) {
        idProducto = $("#txtCondigoInterno").val();
        idAnimal = $("#txtCodigoAnimal").val();
    }
    $.ajax({
        async: true,
        type: "POST",
        url: "rest/mascota/save",
        data: {
            idProducto: idProducto,
            idMascota: idAnimal,
            precioCompra: precioCompra,
            nombre: nombre,
            especie: especie,
            raza: raza,
            existencias: existencias,
            fechaNacimieto: fechaNacimiento,
            fechaLlegada: fechaLlegada,
        }
    }).done(function (data) {
        if (data.exception != null) {
            alert("Error");
            Swal.fire("La operación no pudo sser completada",
                    data.exception,
                    "error");
        } else {
            $("#txtCodigoInterno").val(data.producto.id);
            $("#txtCodigoAnimal").val(data.id);
            $("#txtPrecioVenta").val(data.producto.precioVenta);
            if (data.producto.status == 1) {
                $("#chbStatus").prop("checked", true);
            } else {
                $("#chbStatus").prop("checked", false);
            }
            Swal.fire("Operación realizada con exito",
                    "Los datos de la mascota fueron guardados correctamente",
                    "success");
            refrescarTablaAnimal();
        }
    })
}

function guardarProducto() {
    //creamos un nuevo objeto y le asignamos propiedades y valores
    //obtenidos desde las cajas de texto
    var producto = {
        id: 0, //CodigoInterno
        nombre: $("#txtNombre").val(),
        exitencias: $("#txtExistencias").val(),
        raza: $("#txtRaza").val(),
        especie: $("#txtEspecie").val(),
        fechaNacimiento: $("#txtFechaNacimiento").val(),
        fechaLlegada: $("#txtFechaLlegada"),
        precioCompra: $("#txtPrecioCompra").val(),
        precioVenta: $("#txtPrecioVenta").val(),
        estatus: 1
    };
    if ($("#txtCodigoInterno").val().length > 0) {
        producto.id = parseInt($("#txtCondigoInterno").val());
    }

    //comparamos si el id del producto tiene un valor de 0 o superior para 
    //decidir  si insertamos o actualizamos 
    if (producto.id == 0) {
        //incrementamos el codigo interno:
        codigo_interno_auto++;
        //asignamos el codigo interno actual
        producto.id = codigo_interno_auto;
        insertarproducto(producto);
        refrescarTablaAnimal();
    }
}

/**
 * Inserta un producto en el arreglo JSON productos.
 * @param {type} p
 * @returns {undefined}
 */
function insertarAnimal(p)
{
    mascotas.push(p);
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
function modificarAnimal(p)
{
    //Primero buscamos la posicion del producto con base en su id:
    var pos = buscarPosicionAnimal(p.id);

    //Revisamos que sea una posición válida:
    if (pos >= 0)
    {
        //Guardamos el nuevo objeto en dicha posición:
        mascotas[pos] = p;
        Swal.fire('Movimiento realizado',
                'Registro modificado correctamente',
                'success');
    } else
    {
        //alert('No se encontro un producto con ese ID: Error de integridad.');
        Swal.fire('Error al realizar movimiento',
                'Se encontro un error de integridad, contácte al área de sistemas',
                'error');
    }
}

function eliminarAnimal()
{
    //Recuperamos el ID del producto:
    var id = $("#txtCodigoAnimal").val();
    //var pos = buscarPosicionAnimal(id); Cre que esto no va

    //if (pos >= 0)
    //{
    //mascotas[pos].Status = 0;
    if ($("#chbStatus").prop("checked")) {
        $.ajax({
            async: true,
            type: "POST",
            url: "rest/mercancia/delete",
            data: {
                idProducto: idProducto
            }
        }).done(function (data) {
            if (data.exception != null) {
                alert("Error");
                Swal.fire("La operacion no pudo ser completada",
                        data.exception,
                        "error");
            } else {

                Swal.fire("Operacion realizada con exito",
                        "La mercancia fue elimianda correctamente",
                        "success");
                $("#chbStatus").prop("checked", false);
                refrescarTablaProductos();
            }
        });
    } else {
        Swal.fire("Error",
                "La mercancia ya esta eliminada",
                "error");
        refrescarTablaAnimal();
    }
    //}

}
function eliminarProducto()
{
    //Recuperamos el ID del producto:
    var id = $("#txtCodigoInterno").val();
    var pos = buscarPosicionProducto(id);
    if (pos >= 0)
    {
        productos[pos].status = 0;
        $("#chbStatus").prop("checked", false);
        //alert('Producto eliminado correctamente.');
        Swal.fire('Movimiento realizado',
                'Registro eliminado correctamente',
                'success');
        refrescarTablaProductos();
        limpiarCamposDetalleProducto();
    }
}

/**
 * Busca un producto por su ID dentro del arreglo
 * JSON de productos.
 * @param {type} id
 * @returns {undefined}
 */
function buscarPosicionAnimal(id)
{
    //Recorremos el arreglo para buscar el ID del producto
    //correspondiente y devolver la posición:
    for (var i = 0; i < mascotas.length; i++)
    {
        //Si el id buscado es igual al ID del producto en la posición i,
        //devolvemos el valor de i:
        if (id == mascotas[i].id)
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
function refrescarTablaAnimal()
{
    var contenido = '';
    $.ajax({
        type: "GET",
        url: "rest/mascota/getAll"
    }).done(function (data) {
        if (data.exception != null) {
            Swal.fire("La operación no puede ser completada", data.exception, "error");
        } else if (data.legth < 1) {
            contenido = '<tr>' +
                    '<td coldspan="9" class="text-center">' +
                    '<img alt="" src="media/img/1.jpg" style= height : 256px;"/><br>'
            '<span class="text-danger font-weight-bold">' +
                    'Por el momento, no tienes productos en lo catálogo' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyMascotas").html(contenido);
            return;
        } else {
            mascotas = data;
            for (var i = 0; i < mascotas.length; i++) { // tenias masctas en vez de mascotas
                contenido = contenido + '<tr>' +
                        '<td>' + mascotas[i].producto.nombre + '</td>' +
                        '<td>' + mascotas[i].raza + '</td>' +
                        '<td>' + mascotas[i].especie + '</td>' +
                        '<td>' + mascotas[i].producto.existencias + '</td>' +
                        '<td>' + mascotas[i].producto.precioCompra + '</td>' +
                        '<td>' + mascotas[i].producto.precioVenta + '</td>' +
                        '<td>' + mascotas[i].producto.status + '</td>' +
                        '<td>' + mascotas[i].fechaNacimiento + '</td>' +
                        '<td>' + mascotas[i].fechaLlegada + '</td>' +
                        '<td> <a href="#" class="text-info" onclick="mostrarDetalleAnimal(' + i +
                        ')"><i class= "fa fa-eye"> </i></a></td>' + '</tr>';
            }
            $("#tbodyMascotas").html(contenido);
        }
    });
}

function limpiarCamposDetalleAnimal()
{
    $("#txtCodigoAnimal").val("");
    $("#txtNombre").val("");
    $("#txtEspecie").val("");
    $("#txtRaza").val("");
    $("#txtPrecio").val("");
    $("#txtExistencias").val("");
    $("#txtFechaNac").val("");
    $("#txtFechaLlegada").val("");
    $("#chbStatus").prop("checked", false);
    
}

function mostrarDetalleAnimal(pos)
{
    var m = mascotas[pos];

    $("#txtCodigoAnimal").val(m.id);
    $("#txtNombre").val(m.producto.nombre);
    $("#txtEspecie").val(m.especie);
    $("#txtRaza").val(m.raza);
    $("#txtPrecioCompra").val(m.producto.precioCompra);
    $("#txtPrecioVenta").val(m.producto.precioVenta);
    $("#txtExistencias").val(m.producto.existencias);
    $("#txtFechaNac").val(m.fechaNacimiento);
    $("#txtFechaLlegada").val(m.fechaLlegada);
    
    if (m.Status == 1)
    {
        $("#chbStatus").prop("checked", true);
    } else
    {
        $("#chbStatus").prop("checked", false);
    }

}

function cargarfotografia(objetoInputFile) {
    if (objetoInputFile.files && objetoInputFile.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var fotoB64 = e.target.result;
            $("#imgFoto").attr("src", fotoB64);
            $("#txtBase64").val(fotoB64.substring(22, fotoB64.lenght));
        };
        reader.readAsDataURL(objetoInputFile.file[0]);
    }
}

function ocultarSeccionDetalleAnimal() {
    $("#divDetalleAnimal").hide();
    $("#divCatalogoAnimal").removeClass("col-sm-9");
    $("#divCatalogoAnimal").addClass("col-sm-12");
}

function mostrarSeccionDetalleAnimal() {
    $("#divDetalleAnimal").show();
    $("#divCatalogoAnimal").removeClass("col-sm-12");
    $("#divCatalogoAnimal").addClass("col-sm-9");
}

function eliminarMascota() {
    var idAnimal = 0;
    if ($("#txtIdAnimal").val().length > 0) {
        idAnimal = $("#txtIdAnimal").val();
    }
    $.ajax({
        async: true,
        type: "POST",
        url: "rest/mascota/delete",
        data: {
            idAnimal: idAnimal
        }
    }).done(function (data) {
        if (data.exception != null) {
            Swal.fire("La operación no pudo ser completada",
                    data.exception,
                    "error");
        } else {
            Swal.fire("Operación realizada con éxito",
                    "El registro se eliminó correctamente.",
                    "success");
            refrescarTablaAnimal();
            limpiarCamposDetalleMascotas();
        }
    });
}
