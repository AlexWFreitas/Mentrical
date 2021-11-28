package com.tcc.webapp.payload.response;

import java.time.LocalDateTime;

public class ReportResponse {

	private Long id;

	private String reportTitle;

	private String reportMessage;

	private LocalDateTime createdDate;

	private Long idUser;

	private String creatorName;

	private String symptomList;

	private String mood;

	public ReportResponse (Long id, String reportTitle, String reportMessage, LocalDateTime createdDate, String mood, String symptomList, Long idUser, String creatorName) {
		this.id = id;
		this.reportTitle = reportTitle;
		this.reportMessage = reportMessage;
		this.createdDate = createdDate;
		this.mood = mood;
		this.symptomList = symptomList;
		this.idUser = idUser;
		this.creatorName = creatorName;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getReportTitle() {
		return this.reportTitle;
	}

	public void setReportTitle(String reportTitle) {
		this.reportTitle = reportTitle;
	}

	public String getReportMessage() {
		return this.reportMessage;
	}

	public void setReportMessage(String reportMessage) {
		this.reportMessage = reportMessage;
	}

	public LocalDateTime getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	public Long getIdUser() {
		return this.idUser;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}

	public String getCreatorName() {
		return this.creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}

	public String getSymptomList() {
		return this.symptomList;
	}

	public void setSymptomList(String symptomList) {
		this.symptomList = symptomList;
	}

	public String getMood() {
		return this.mood;
	}

	public void setMood(String mood) {
		this.mood = mood;
	}
}
