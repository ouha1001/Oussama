package demo.dao;

import java.util.Optional;

import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import demo.model.Image;


@Singleton
public class ImageDAO {
	
	@PersistenceContext(name = "jpa-unit")
    EntityManager em;
	
	public Image safeImage(byte[] imageData, String contentType) {
		try {
			Image image = new Image();
			image.setImageData(imageData);
			image.setContentType(contentType);
			em.persist(image);
			em.flush();
			em.refresh(image);
			return image; 
		} catch(Throwable thr) {
			throw new RuntimeException("Error saving the Image");
		}
	}
	
	public Optional<Image> findWithImage(int imageId) {
		Image image = em.find(Image.class, imageId); 
		if (image != null) {
			return Optional.of(image);
		} else {
			return Optional.empty();
		}
	}
	
	public int iidMax() {
		Query query = em.createNamedQuery("Image.imageId", Image.class);
		Integer t = (Integer)  query.getSingleResult();
		return t;
		 
	}

}
