package com.tcc.webapp.payload.response;

import java.util.HashSet;
import java.util.Set;

import com.tcc.webapp.model.appointment.Appointment;

public class DoctorAppointment {
	
	private Long idTreatment;
	private Long idPatient;
	private String firstName;
	private String lastName;
	private String fullName;
	private String email;
	private String contactNumber;
	private Set<Appointment> consultas = new HashSet<Appointment>();

	public Long getIdTreatment() {
		return this.idTreatment;
	}

	public void setIdTreatment(Long idTreatment) {
		this.idTreatment = idTreatment;
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

	public Long getIdPatient() {
		return this.idPatient;
	}

	public void setIdPatient(Long idPatient) {
		this.idPatient = idPatient;
	}

	public String getFullName() {
		return this.fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
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

	public Set<Appointment> getConsultas() {
		return this.consultas;
	}

	public void setConsultas(Set<Appointment> consultas) {
		this.consultas = consultas;
	}
}
