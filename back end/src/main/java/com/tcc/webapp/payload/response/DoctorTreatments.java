package com.tcc.webapp.payload.response;

import java.util.ArrayList;
import java.util.List;

import com.tcc.webapp.payload.dto.UserTreatmentDTO;

public class DoctorTreatments {

	private Long idDoctor;
	private List<UserTreatmentDTO> doctorTreatments = new ArrayList<>();

	public DoctorTreatments(Long idDoctor) {
		this.idDoctor = idDoctor;
	}

	public Long getIdDoctor() {
		return this.idDoctor;
	}

	public void setIdDoctor(Long idDoctor) {
		this.idDoctor = idDoctor;
	}	

	public List<UserTreatmentDTO> getDoctorTreatments() {
		return this.doctorTreatments;
	}

	public void setDoctorTreatments(List<UserTreatmentDTO> doctorTreatments) {
		this.doctorTreatments = doctorTreatments;
	}
}
