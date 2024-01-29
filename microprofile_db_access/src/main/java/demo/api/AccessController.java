package demo.api;

import java.util.UUID;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import demo.api.access.AccessManager;
import demo.api.dto.LoginDto;
import demo.api.dto.Token;


@Path("/access")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AccessController {

	@Inject
	private AccessManager accessManager;

	@POST
	public Token login(LoginDto loginDto) {
		try {
			System.out.println("Login: " + loginDto );
			
			UUID uuid = accessManager.register(loginDto.getUsername(), loginDto.getPassword());

			System.out.println("Login : " + loginDto.getUsername());
			System.out.println("  -> " + uuid);

			return new Token(uuid);
		} catch (Throwable thr) {
			accessManager.deregister(loginDto.getUsername());
			throw new RuntimeException("ERROR: login");
		}
	}

	@DELETE
	public Response logout(@QueryParam("token") String token) {
		
		System.out.println("Token: " + token);
		String username = accessManager.getUsername(UUID.fromString(token));	
		System.out.println("Logout: " + username);
		
		return accessManager.deregister(username) ? Response.ok().build() : Response.status(404).build();
	}



}
