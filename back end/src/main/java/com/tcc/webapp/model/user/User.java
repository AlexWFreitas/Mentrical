package com.tcc.webapp.model.user;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.tcc.webapp.model.report.Report;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(	name = "users", 
		uniqueConstraints = { 
			@UniqueConstraint(columnNames = "username"),
			@UniqueConstraint(columnNames = "email") 
		})
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 20)
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@NotBlank
	private String contactNumber;

	@NotBlank
	private String identificationInfo;

	@NotBlank
	private String firstName;

	@NotBlank
	private String lastName;

	@NotBlank
	@Size(max = 120)
	private String password;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	@OneToMany(mappedBy="creator")
	@JsonManagedReference(value="user-reports")
	private Set<Report> reports;

	@OneToMany(mappedBy="patient", cascade = CascadeType.ALL)
	@JsonManagedReference(value="user-patient-treatments")
	private Set<UserTreatment> patientOfDoctor = new HashSet<>();

	@OneToMany(mappedBy="doctor", cascade = CascadeType.ALL)
	@JsonManagedReference(value="user-doctor-treatments")
	private Set<UserTreatment> doctorOfPatients = new HashSet<>();

	public User() {
	}

	public User(String username, String email, String contactNumber, String identificationInfo, String firstName, String lastName, String password) {
		this.username = username;
		this.email = email;
		this.contactNumber = contactNumber;
		this.identificationInfo = identificationInfo;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public String getFullName() {
		return this.getFirstName() + " " + this.getLastName();
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

	public Set<Report> getReports() {
		return this.reports;
	}

	public void setReports(Set<Report> reports) {
		this.reports = reports;
	}

	public Set<UserTreatment> getPatientOfDoctor() {
		return this.patientOfDoctor;
	}

	public void setPatientOfDoctor(Set<UserTreatment> PatientOfDoctor) {
		this.patientOfDoctor = PatientOfDoctor;
	}

	public Set<UserTreatment> getDoctorOfPatients() {
		return this.doctorOfPatients;
	}

	public void setDoctorOfPatients(Set<UserTreatment> DoctorOfPatients) {
		this.doctorOfPatients = DoctorOfPatients;
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
