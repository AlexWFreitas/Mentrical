package com.tcc.webapp.payload.response;

import java.util.List;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private String contactNumber;
	private String identificationInfo;
	private List<String> roles;
	private String firstName;
	private String lastName;

	public JwtResponse(String accessToken, Long id, String username, String email, String contactNumber, String identificationInfo, List<String> roles, String firstName, String lastName) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.contactNumber = contactNumber;
		this.identificationInfo = identificationInfo;
		this.roles = roles;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}
	
	public void setRoles(List<String> roles) {
		this.roles = roles;
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

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getContactNumber() {
		return this.contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getIdentificationInfo() {
		return this.identificationInfo;
	}

	public void setIdentificationInfo(String identificationInfo) {
		this.identificationInfo = identificationInfo;
	}
}
