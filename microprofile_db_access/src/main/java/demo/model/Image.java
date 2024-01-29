package demo.model;

import java.io.Serializable;
import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "image")
@NamedQueries({
@NamedQuery(name ="Image.findWithImageId", query = "SELECT u FROM Image u WHERE u.imageId = :imageId"),
@NamedQuery(name ="Image.imageId", query = "SELECT MAX(u.imageId) FROM Image u")
})

public class Image implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id", nullable = false, unique = true)
	private Integer imageId;
	
	@Column(name = "image_data", nullable = false)
	private byte[] imageData; 
	
	@Column(name = "content_type", nullable = false)
	private String contentType;

	public Integer getImageId() {
		return imageId;
	}

	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}

	public byte[] getImageData() {
		return imageData;
	}

	public void setImageData(byte[] imageData) {
		this.imageData = imageData;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	} 
	
	public String toString() {
		return "ImageId " + imageId + ", ContentType " + contentType + ", ImageData " + Arrays.toString(imageData); 
	}
}
