package demo.api.dto;

import java.io.Serializable;

import demo.model.Image;

@SuppressWarnings("serial")
public class ImageDto implements Serializable{
	private String contentType; 
	private byte[] imageData; 
	private int imageId; 
	
	public ImageDto() {
	}
	
	public ImageDto(Image image) {
		this.imageId = image.getImageId();
		this.contentType = image.getContentType(); 
		this.imageData = image.getImageData();
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public byte[] getImageData() {
		return imageData;
	}

	public void setImageData(byte[] imageData) {
		this.imageData = imageData;
	}

	public int getImageId() {
		return imageId;
	}

	public void setImageId(int imageId) {
		this.imageId = imageId;
	}

}
