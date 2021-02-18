
package org.lila_systems.mypet.rest;

/**
 *
 * @author Abel Mendoza Vera
 */


import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.lila_systems.mypet.controller.ControllerProveedor;
import org.lila_systems.mypet.model.Proveedor;
import org.lila_systems.mypet.model.Persona;

@Path("proveedor")
public class RESTProveedor extends Application {

    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("idProveedor") @DefaultValue("0") int idProveedor,
            @FormParam("idRepresentante") @DefaultValue("0") int idRepresentante,
            @FormParam("nombre") @DefaultValue("") String nombre,
            @FormParam("apellidoPaterno") @DefaultValue("") String apellidoPaterno,
            @FormParam("apellidoMaterno") @DefaultValue("") String apellidoMaterno,
            @FormParam("calle") @DefaultValue("") String calle,
            @FormParam("numero") @DefaultValue("") String numero,
            @FormParam("colonia") @DefaultValue("") String colonia,
            @FormParam("cp") @DefaultValue("0") int cp,  
            @FormParam("ciudad") @DefaultValue("") String ciudad,
            @FormParam("estado") @DefaultValue("") String estado,
            @FormParam("tel1") @DefaultValue("") String tel1,
            @FormParam("rfc") @DefaultValue("") String rfc,
            @FormParam("razonSocial") @DefaultValue("") String razonSocial,
            @FormParam("status") @DefaultValue("1") int status) {
        String out = "";
        Persona p = new Persona();
        Proveedor pr = new Proveedor();
        ControllerProveedor ce = new ControllerProveedor();

        //Llenamos los datos del objeto del tipo Persona:
        p.setId(idRepresentante);
        p.setNombre(nombre);
        p.setApellidoPaterno(apellidoPaterno);
        p.setApellidoMaterno(apellidoMaterno);
        p.setCalle(calle);
        p.setNumero(numero);
        p.setColonia(colonia);
        p.setCp(cp);
        p.setCiudad(ciudad);
        p.setEstado(estado);
        p.setTel1(tel1);
        //p.setEstatus(status);
        p.setStatus(status);

        //Llenamos los datos del objeto del tipo proveedor:
        pr.setId(idProveedor);
        pr.setRfc(rfc);
        pr.setRazonSocial(razonSocial);
        pr.setProveedor(p);
        
        try {
            //Revisamos si el producto NO tiene un ID:
            if (pr.getProveedor().getId()==0){
                ce.insert(pr);
            }else{
                ce.update(pr);  
            }
            out = new Gson().toJson(pr);
        
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"" + e.toString()+ "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

   @Path("delete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idPersona") @DefaultValue("0") int idPersona) {
        String out = "";
        ControllerProveedor cpr = new ControllerProveedor();
        try {
            cpr.delete(idPersona);

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
        ControllerProveedor cpr = new ControllerProveedor();
        List<Proveedor> proveedores = new ArrayList<>();
        try {
            proveedores = cpr.getAll(filtro);
            
            out = new Gson().toJson(proveedores);
        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
}
