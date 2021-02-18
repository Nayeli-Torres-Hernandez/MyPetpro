
package org.lila_systems.mypet.rest;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.google.gson.Gson;
import org.lila_systems.mypet.model.Cliente;
import org.lila_systems.mypet.model.Persona;
import org.lila_systems.mypet.controller.ControllerCliente;

@Path("cliente")
public class RESTCliente extends Application{
    
    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("idPersona") @DefaultValue("0") int idPersona,
                         @FormParam("idCliente") @DefaultValue("0") int idCliente,
                         @FormParam("status") @DefaultValue("1") int status,
                         @FormParam("nombre") @DefaultValue("") String nombre,
                         @FormParam("apellidoPaterno") @DefaultValue("") String apellidoPaterno,
                         @FormParam("apellidoMaterno") @DefaultValue("") String apellidoMaterno,
                         @FormParam("fechaNacimiento") @DefaultValue("") String fechaNacimiento,
                         @FormParam("calle") @DefaultValue("") String calle,
                         @FormParam("numero") @DefaultValue("") String numero,
                         @FormParam("colonia") @DefaultValue("") String colonia,
                         @FormParam("cp") @DefaultValue("0") int cp,
                         @FormParam("ciudad") @DefaultValue("") String ciudad,
                         @FormParam("estado") @DefaultValue("") String estado,
                         @FormParam("tel1") @DefaultValue("") String tel1,
                         @FormParam("tel2") @DefaultValue("") String tel2,
                         @FormParam("correo") @DefaultValue("") String correo,
                         @FormParam("contrasenia") @DefaultValue("") String contrasenia){
        
        
        String out = "";
        Persona p = new Persona();
        Cliente c = new Cliente();
        ControllerCliente cc = new ControllerCliente();
        
        p.setId(idPersona);
        p.setApellidoMaterno(apellidoMaterno);
        p.setNombre(nombre);
        p.setApellidoPaterno(apellidoPaterno);
        p.setFechaNacimiento(fechaNacimiento);
        p.setCalle(calle);
        p.setNumero(numero);
        p.setColonia(colonia);
        p.setCp(cp);
        p.setCiudad(ciudad);
        p.setEstado(estado);
        p.setTel1(tel1);
        p.setTel2(tel2);
        //p.setEstatus(status);
        p.setStatus(status);
        c.setId(idCliente);
        c.setContrasenia(contrasenia);
        c.setCorreo(correo);
        c.setPersona(p);
        
        try {
            if (c.getPersona().getId() == 0) {
                cc.insert(c);
            } else {
                cc.update(c);
            }
            out = new Gson().toJson(c);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("delete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idPersona") @DefaultValue("0") int idPersona) {
        String out = "";
        ControllerCliente cc = new ControllerCliente();
        try {
            cc.delete(idPersona);
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
        ControllerCliente cc = new ControllerCliente();
        List<Cliente> clientes = new ArrayList<>();
        try {
            clientes = cc.getAll(filtro);
            out = new Gson().toJson(clientes);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
                         
}
