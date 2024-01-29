package demo.api.dto;

import java.io.Serializable;

import demo.model.User;

@SuppressWarnings("serial")
public class UserDtoOut implements Serializable {
	private String username;
	private String firstname;
	private String lastname;
	private String email;
	private String street;
	private String streetNumber;
	private String zip;
	private String city;
	private int image_id;
	private int user_id; 
	
	public UserDtoOut()
	{
	
	}
	
	public UserDtoOut(User user)
	{
		this.username = user.getUsername();
		this.firstname = user.getFirstname();
		this.lastname = user.getLastname();
		this.email = user.getEmail();
		this.street = user.getStreet();
		this.streetNumber = user.getStreetNumber();
		this.zip = user.getZip();
		this.city = user.getCity();
		this.image_id = user.getImageId(); 
		this.user_id = user.getUserId();	
	}
	
	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getImage_id() {
		return image_id;
	}

	public void setImage_id(int image_id) {
		this.image_id = image_id;
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getStreetNumber() {
		return streetNumber;
	}
	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	
	
}
