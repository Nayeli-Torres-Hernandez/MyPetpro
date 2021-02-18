package org.lila_systems.mypet.rest;

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
import org.lila_systems.mypet.controller.ControllerEmpleado;
import org.lila_systems.mypet.model.Empleado;
import org.lila_systems.mypet.model.Persona;

@Path("empleado")
public class RESTEmpleado extends Application {

    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("idEmpleado") @DefaultValue("0") int idEmpleado,
            @FormParam("idPersona") @DefaultValue("0") int idPersona,
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
            @FormParam("contrasenia") @DefaultValue("") String contrasenia,
            @FormParam("status") @DefaultValue("1") int status) {
        String out = "";
        Persona p = new Persona();
        Empleado e1 = new Empleado();
        ControllerEmpleado ce = new ControllerEmpleado();

        //Llenamos los datos del objeto del tipo Persona:
        p.setId(idPersona);
        p.setNombre(nombre);
        p.setApellidoPaterno(apellidoPaterno);
        p.setApellidoMaterno(apellidoMaterno);
        p.setFechaNacimiento(fechaNacimiento);
        p.setCalle(calle);
        p.setNumero(numero);
        p.setColonia(colonia);
        p.setCp(cp);
        p.setCiudad(ciudad);
        p.setEstado(estado);
        p.setTel1(tel1);
        p.setTel2(tel2);
        p.setStatus(status);

        //Llenamos los datos del objeto del tipo Empleado:
        e1.setId(idEmpleado);
        e1.setCorreo(correo);
        e1.setContrasenia(contrasenia);
        e1.setEmpleado(p);
        
        try {
            //Revisamos si el producto NO tiene un ID:
            if (e1.getEmpleado().getId()==0){
                ce.insert(e1);
            }else{
                ce.update(e1);  
            }
            out = new Gson().toJson(e1);
        
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
        ControllerEmpleado ce = new ControllerEmpleado();
        try {
            ce.delete(idPersona);

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
        ControllerEmpleado ce = new ControllerEmpleado();
        List<Empleado> empleados = new ArrayList<>();
        try {
            empleados = ce.getAll(filtro);
            
            out = new Gson().toJson(empleados);
        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

}
