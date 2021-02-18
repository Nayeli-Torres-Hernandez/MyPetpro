
package org.lila_systems.mypet.rest;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.POST;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.lila_systems.mypet.controller.ControllerMascota;
import org.lila_systems.mypet.model.Mascota;
import org.lila_systems.mypet.model.Producto;
/**
 *
 * @author elvia
 */
@Path ("mascota")
public class RESTMascota extends Application {

    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    //Este metodo recibe todos los parametros que contiene mascota
    public Response save(@FormParam("idMascota") @DefaultValue("0") int idMascota,
            @FormParam("idProducto") @DefaultValue("0") int idProducto,
            @FormParam("nombre") @DefaultValue("") String nombre,
            @FormParam("existencias") @DefaultValue("0") int existencias,
            @FormParam("precioCompra") @DefaultValue("0") double precioCompra,
            //@FormParam("foto") @DefaultValue("") String foto,   No se pide en la base de datos
            @FormParam("status") @DefaultValue("1") int status,
            @FormParam("raza") @DefaultValue("") String raza,
            @FormParam("especie") @DefaultValue("") String especie,
            @FormParam("fechaNacimiento") @DefaultValue("") String fechaNacimiento,
            @FormParam("fechaLlegada") @DefaultValue("") String fechaLlegada) {
        //creo los objetos necesarios 
        String out = "";
        Producto p = new Producto();
        Mascota m = new Mascota();
        ControllerMascota ca = new ControllerMascota();

        //Llenamos los datos del objeto de tipo producto
        p.setId(idProducto);
        p.setNombre(nombre);
        p.setExistencias(existencias);
        p.setPrecioCompra(precioCompra);
        //p.setFoto(foto);
        p.setStatus(status);

        //llenamos los datos de tipo mascota
        m.setId(idMascota);
        m.setRaza(raza);
        m.setEspecie(especie);
        m.setFechaNacimiento(fechaNacimiento);
        m.setFechaLlegada(fechaLlegada);
        m.setProducto(p);

        try {
            //comprobamos si el producto NO tiene un ID
            if (m.getProducto().getId() == 0) {
                ca.insert(m);//Insertamos la mercancia en la BD
            } else {
                ca.update(m);//Actualizamos la mercancia en la BD
            }
            out = new Gson().toJson(m);

        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("delete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idProducto") @DefaultValue("0") int idProducto) {
        String out = " ";
        ControllerMascota ca = new ControllerMascota();
        try {
            ca.delete(idProducto);
            out = "{\"result\":\"OK\"}";
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = "";
        ControllerMascota ca = new ControllerMascota();
        List<Mascota> mascota = new ArrayList<>();
        try {
            mascota = ca.getAll(filtro);
            out = new Gson().toJson(mascota);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

}
