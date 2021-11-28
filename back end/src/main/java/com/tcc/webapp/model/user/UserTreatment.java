package com.tcc.webapp.model.user;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.tcc.webapp.model.appointment.Appointment;
import com.tcc.webapp.model.surveyResponse.SurveyResponse;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class UserTreatment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JsonBackReference(value="user-doctor-treatments")
	private User doctor;

	@ManyToOne
	@JsonBackReference(value="user-patient-treatments")
	private User patient;

	@OneToMany(mappedBy = "userTreatment", cascade = CascadeType.ALL)
	@JsonManagedReference
	private Set<TreatmentSurvey> assignedSurveys;

	@OneToMany(mappedBy = "doctorPatientPair", cascade = CascadeType.ALL)
	@JsonManagedReference
	private Set<Appointment> appointments;

	@OneToMany(mappedBy = "treatedUser")
	@JsonManagedReference
	private Set<SurveyResponse> answeredSurveys;

	private UserTreatment() {}

	public UserTreatment(User doctor, User patient) {
		this.doctor = doctor;
		this.patient = patient;
	}

	public Set<TreatmentSurvey> getAssignedSurveys() {
		return this.assignedSurveys;
	}

	public void setAssignedSurveys(Set<TreatmentSurvey> assignedSurveys) {
		this.assignedSurveys = assignedSurveys;
	}

	public Set<SurveyResponse> getAnsweredSurveys() {
		return this.answeredSurveys;
	}

	public void setAnsweredSurveys(Set<SurveyResponse> answeredSurveys) {
		this.answeredSurveys = answeredSurveys;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getDoctor() {
		return this.doctor;
	}

	public void setDoctor(User doctor) {
		this.doctor = doctor;
	}

	public User getPatient() {
		return this.patient;
	}

	public void setPatient(User patient) {
		this.patient = patient;
	}

	public Set<Appointment> getAppointments() {
		return this.appointments;
	}

	public void setAppointments(Set<Appointment> appointments) {
		this.appointments = appointments;
	}

	public Long getPatientIdUser() {
		return this.getPatient().getId();
	}
}
