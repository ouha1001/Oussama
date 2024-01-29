package demo.api;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.inject.Inject;
//import javax.management.RuntimeErrorException;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
//import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import demo.api.access.AccessManager;
import demo.api.dto.Token;
import demo.api.dto.UserDtoIn;
import demo.api.dto.UserDtoOut;
import demo.dao.UserDAO;
import demo.model.Position;
import demo.model.User;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserController
{
	
	@Inject
	private UserDAO userDAO;
	
	@Inject
	private AccessManager accessManager;
	

    @GET
	public UserDtoOut getUser(@QueryParam("token") UUID uuid) 
	{
		if( accessManager.hasAccess(uuid) == false )
		{
			throw new RuntimeException("ERROR: Access not granted");
		}
		
		String username = accessManager.getUsername(uuid);
		Optional<User> optUser = userDAO.findUser(username);
		if( optUser.isPresent() )
		{
			UserDtoOut userDto = new UserDtoOut(optUser.get());
			return userDto;
		}
		else
		    throw new RuntimeException("ERROR: User not found");
	}
	
    @DELETE
    @Transactional
	public boolean deleteUser(@QueryParam("token") UUID uuid)
	{
		if( accessManager.hasAccess(uuid) == false )
		{
			throw new RuntimeException("ERROR: Access not granted");
		}
		
		String username = accessManager.getUsername(uuid);
		
		if( userDAO.deleteUser(username) )
		{
			accessManager.deregister(username);
			return true;
		}
		else
		{
			return false;
		}
	}

    @GET
    @Path("/search")
	public List<UserDtoOut> findUsersNearby(@QueryParam("distance") int distance, @QueryParam("token") UUID uuid) {
		
		if( accessManager.hasAccess(uuid) == false )
		{
			throw new RuntimeException("ERROR: Access not granted");
		}
		
		String username = accessManager.getUsername(uuid);
		User user = userDAO.findUser(username).get();
		
		List<User> users = userDAO.findUserNearBy(user.getPosition(), distance);
		
		return users.stream().map( UserDtoOut::new ).collect(Collectors.toList() );
	}
    
    @GET
    @Path("/username")
    public boolean checkUnameAvailable(@QueryParam("username") String username) {
    	Optional<User> user = userDAO.findUser(username); 
    	return user.isPresent(); 
    }
    
	@POST
	@Transactional
	public Token register(UserDtoIn user) {

		userDAO.createUser(user.getUsername(), user.getPassword(), user.getFirstname(), 
				user.getLastname(), user.getEmail(), user.getStreet(), user.getStreetNumber(), user.getZip(), user.getCity(), user.getImage_id());

		UUID uuid = accessManager.register(user.getUsername(), user.getPassword());
		
		return new Token(uuid);
	}
	
	@GET
    @Path("/position")
    public Position getUserPosition(@QueryParam("username") String username) {
        User user = userDAO.findUser(username).get();
        return user.getPosition();
    }
	
	@GET
	@Path("/userId")
	public UserDtoOut getUserId(@QueryParam("username") String username, @QueryParam("token") UUID uuid) {
		if(accessManager.hasAccess(uuid) == false) {
			throw new RuntimeException("ERROR: Access denied");
		}
		Optional<User> optUser = userDAO.getUserId(username); 
		if(optUser.isPresent()) {
			UserDtoOut uDto = new UserDtoOut(optUser.get()); 
			return uDto;
		}
		else
			throw new RuntimeException("ERROR: Couldnt find UserId"); 
	}
}

