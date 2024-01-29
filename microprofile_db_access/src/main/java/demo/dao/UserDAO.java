package demo.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Singleton;


import demo.geocode.GeoCoderImpl;
import demo.model.Position;
import demo.model.User;
import demo.model.converter.PositionConverter;
import demo.util.PasswordTools;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;


@Singleton
public class UserDAO {
	
	@PersistenceContext(name = "jpa-unit")
    EntityManager em;
	
	@Inject
    GeoCoderImpl geoCoder;

	public boolean checkUserPassword(String username, String password) {

		try {
			Query query = em.createNamedQuery("User.findByUserName", User.class);
			query.setParameter("username", username);
			User user = (User) query.getSingleResult();

			byte[] passwordSalt = user.getPasswordSalt();
			byte[] passwordHash = user.getPasswordHash();

			byte[] passwordToCheck = PasswordTools.generatePasswordHash(password, passwordSalt);
			if (Arrays.equals(passwordHash, passwordToCheck)) {
				return true;
			} else {
				return false;
			}
		} catch (Throwable thr) {
			throw new RuntimeException("ERROR checkUserPassword");
		}

	}


	public boolean deleteUser(String username) {
		try {
			Query query = em.createNamedQuery("User.findByUserName", User.class);
			query.setParameter("username", username);
			User user = (User) query.getSingleResult();
			em.remove(user);

			return true;
		} catch (Throwable thr) {
			throw new RuntimeException("ERROR checkUserPassword");
		}
	}

	public User createUser(String username, String password, String firstname, String lastname, String email,
			String street, String streetNumber, String zip, String city, int image_id) {

		try {
			User user = new User();
			user.setUsername(username);
			user.setFirstname(firstname);
			user.setLastname(lastname);
			user.setEmail(email);
			user.setStreet(street);
			user.setStreetNumber(streetNumber);
			user.setZip(zip);
			user.setCity(city);
			user.setImageId(image_id);
						
			Optional<Position> position = geoCoder.geocode(street, streetNumber, zip, city, "Germany");
			
			if( position.isEmpty() )
			{
				System.out.println("Position not found");
				throw new RuntimeException(" Oussama");
			}
			
			user.setPosition(position.get());

			byte[] passwordSalt = PasswordTools.generateSalt();
			byte[] passwordHash = PasswordTools.generatePasswordHash(password, passwordSalt);

			user.setPasswordSalt(passwordSalt);
			user.setPasswordHash(passwordHash);

			em.persist(user);
			em.flush();
			em.refresh(user);

			return user;
		} catch (Throwable thr) {
			thr.printStackTrace();
			throw new RuntimeException(" Oussama ERROR createUser");
		}

	}

	public Optional<User> findUser(int user_id) {

		User user = em.find(User.class, user_id);


		if (user != null) {
			return Optional.of(user);
		} else {
			return Optional.empty();
		}
	}
	
	public Optional<User> findUser(String username) {

		Query query = em.createNamedQuery("User.findByUserName", User.class);
		query.setParameter("username", username);
		User user = (User) query.getSingleResult();

		if (user != null) {
			return Optional.of(user);
		} else {
			return Optional.empty();
		}
	}

	private static final String searchNearbyUserQuery = "SELECT * FROM user JOIN image USING (image_id) WHERE cast((ST_Distance_Sphere(position,point(?, ?))/1000) as UNSIGNED) < ?";
	@SuppressWarnings("unchecked")
	public List<User> findUserNearBy(Position position, int radiusInKm) {
		try {

			Query sqlQuery = em.createNativeQuery(searchNearbyUserQuery);
			sqlQuery.setParameter(1, position.getLongitude());
			sqlQuery.setParameter(2, position.getLatitude());
			sqlQuery.setParameter(3, radiusInKm );

			final List<Object[]> results = (List<Object[]>) sqlQuery.getResultList();

			List<User> result = new ArrayList<User>();
			for (Object[] row : results) {
				User user = new User();
				user.setImageId((int) row[0]);
				user.setUserId((int) row[1]);
				user.setUsername((String) row[2]);
				user.setFirstname((String) row[3]);
				user.setLastname((String) row[4]);
				user.setEmail((String) row[5]);
				user.setStreet((String) row[6]);
				user.setStreetNumber((String) row[7]);
				user.setZip((String) row[8]);
				user.setCity((String) row[9]);
				Position userPosition = new PositionConverter().convertToEntityAttribute((byte[]) row[10]);
				user.setPosition(userPosition);

				result.add(user);
			}

			return result;
		} catch (Exception exce) {
			exce.printStackTrace();
			return List.of();
		}
	}
	 
	public Position getPosition(String username) {
		Query query = em.createNamedQuery("User.getPosition", User.class);
		query.setParameter("username", username);
		Position position = (Position) query.getSingleResult();
		return position; 
	}
	
	public Optional<User> getUserId(String username) {
		Query query = em.createNamedQuery("User.getUserId", User.class);
		query.setParameter("username", username);
		User user = (User) query.getSingleResult(); 
		if (user != null) {
			return Optional.of(user);
		} else {
			return Optional.empty();
		}
	}
}
