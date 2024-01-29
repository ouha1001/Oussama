package demo.api;


import java.io.InputStream;
import java.util.Optional;
import java.util.UUID;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import demo.api.access.AccessManager;
import demo.dao.ImageDAO;
import demo.model.Image;

@Path("/image")
@Produces(MediaType.APPLICATION_JSON)
@Consumes({"image/png"})
public class ImageController {
	
	@Inject
	private ImageDAO imageDAO; 
	
	@Inject
	private AccessManager am; 
	
	@GET
	@Path("/{imageId}")
	@Produces({"image/png"})
	public Response getImage(@PathParam("imageId") int imageId, @QueryParam("token") UUID uuid) {
		if(am.hasAccess(uuid) == false) {
			throw new RuntimeException("ERROR: Access not granted");
		}
		Optional<Image> optImage = imageDAO.findWithImage(imageId); 
		if(optImage.isPresent()) {
			Image image = optImage.get();
			return Response.ok().entity(image.getImageData()).type("image/png").build();
		} else {
			throw new RuntimeException("Error: couldnt find image"); 
		}
	}
	
	@GET
	public int getMaxIID() {
		int i = imageDAO.iidMax();
		return i; 
	}
	
	@POST 
	@Transactional
	public Response safeImage(InputStream inputStream) {
	
		try {
			byte[] imageData = inputStream.readAllBytes(); 
			imageDAO.safeImage(imageData, "image/png");
			return Response.ok().build();
		}
		catch(Exception e) {
			System.out.println("Error " + e.getMessage());
			return Response.status(404).build(); 
		}
	}
	
}
