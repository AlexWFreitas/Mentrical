package com.tcc.webapp.payload.dto;

public class UserRefreshDTO {
	private String email;
	private String contactNumber;
	private String firstName;
	private String lastName;

	public UserRefreshDTO(String email, String contactNumber, String firstName, String lastName) {
		this.email = email;
		this.contactNumber = contactNumber;
		this.firstName = firstName;
		this.lastName = lastName;
	}


	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContactNumber() {
		return this.contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
}
