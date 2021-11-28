package com.tcc.webapp.payload.response;

import java.time.LocalDateTime;

public class DoctorSchedule {
	private Long idPaciente;
	private Long idConsulta;
	private String firstName;
	private String lastName;
	private LocalDateTime dataConsulta;
	private Integer statusConsulta;
	private String notesConsulta;
	private String contatoPaciente;

	public DoctorSchedule() {}

	public DoctorSchedule(Long idPaciente, Long idConsulta, String firstName, String lastName, LocalDateTime dataConsulta, Integer statusConsulta, String notesConsulta, String contatoPaciente) {
		this.idPaciente = idPaciente;
		this.idConsulta = idConsulta;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dataConsulta = dataConsulta;
		this.statusConsulta = statusConsulta;
		this.notesConsulta = notesConsulta;
		this.contatoPaciente = contatoPaciente;
	}

	public Long getIdPaciente() {
		return this.idPaciente;
	}

	public void setIdPaciente(Long idPaciente) {
		this.idPaciente = idPaciente;
	}

	public Long getIdConsulta() {
		return this.idConsulta;
	}

	public void setIdConsulta(Long idConsulta) {
		this.idConsulta = idConsulta;
	}

	public LocalDateTime getDataConsulta() {
		return this.dataConsulta;
	}

	public void setDataConsulta(LocalDateTime dataConsulta) {
		this.dataConsulta = dataConsulta;
	}

	public Integer getStatusConsulta() {
		return this.statusConsulta;
	}

	public void setStatusConsulta(Integer statusConsulta) {
		this.statusConsulta = statusConsulta;
	}

	public String getNotesConsulta() {
		return this.notesConsulta;
	}

	public void setNotesConsulta(String notesConsulta) {
		this.notesConsulta = notesConsulta;
	}

	public String getContatoPaciente() {
		return this.contatoPaciente;
	}

	public void setContatoPaciente(String contatoPaciente) {
		this.contatoPaciente = contatoPaciente;
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

