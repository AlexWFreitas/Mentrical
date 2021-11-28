package com.tcc.webapp.payload.dto;

public class UserTreatmentDTO {
	private Long idDoctor;
	private Long idPatient;
	private Long idTreatment;
	private String patientName;

	public UserTreatmentDTO(Long idDoctor, Long idPatient, Long idTreatment, String patientName) {
		this.idDoctor = idDoctor;
		this.idPatient = idPatient;
		this.idTreatment = idTreatment;
		this.patientName = patientName;
	}

	public UserTreatmentDTO() {}

	public Long getIdDoctor() {
		return this.idDoctor;
	}

	public void setIdDoctor(Long idDoctor) {
		this.idDoctor = idDoctor;
	}

	public Long getIdPatient() {
		return this.idPatient;
	}

	public void setIdPatient(Long idPatient) {
		this.idPatient = idPatient;
	}

	public Long getIdTreatment() {
		return this.idTreatment;
	}

	public void setIdTreatment(Long idTreatment) {
		this.idTreatment = idTreatment;
	}

	public String getPatientName() {
		return this.patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
}
