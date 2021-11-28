package com.tcc.webapp.model.appointment;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.tcc.webapp.model.user.UserTreatment;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "appointments")
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JsonBackReference
	private UserTreatment doctorPatientPair;

	@NotBlank
	private LocalDateTime appointmentDate;

	private String appointmentAnnotation;

	private Integer status = 0;

	private Appointment() {}

	public Appointment(LocalDateTime appointmentDate, String appointmentAnnotation) {
		this.appointmentDate = appointmentDate;
		this.appointmentAnnotation = appointmentAnnotation;
		this.status = 0;
	}

	public Appointment(UserTreatment doctorPatientPair, LocalDateTime appointmentDate, String appointmentAnnotation) {
		this.doctorPatientPair = doctorPatientPair;
		this.appointmentDate = appointmentDate;
		this.appointmentAnnotation = appointmentAnnotation;
		this.status = 0;
	}

	public Appointment(UserTreatment doctorPatientPair, LocalDateTime appointmentDate, String appointmentAnnotation, Integer status) {
		this.doctorPatientPair = doctorPatientPair;
		this.appointmentDate = appointmentDate;
		this.appointmentAnnotation = appointmentAnnotation;
		this.status = status;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserTreatment getDoctorPatientPair() {
		return this.doctorPatientPair;
	}

	public void setDoctorPatientPair(UserTreatment doctorPatientPair) {
		this.doctorPatientPair = doctorPatientPair;
	}

	public LocalDateTime getAppointmentDate() {
		return this.appointmentDate;
	}

	public void setAppointmentDate(LocalDateTime appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public String getAppointmentAnnotation() {
		return this.appointmentAnnotation;
	}

	public void setAppointmentAnnotation(String appointmentAnnotation) {
		this.appointmentAnnotation = appointmentAnnotation;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}
