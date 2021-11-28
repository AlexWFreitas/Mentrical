package com.tcc.webapp.payload.request;

import javax.validation.constraints.NotBlank;

public class CreateReportRequest {
	
    @NotBlank
    private String creatorName;
 
    @NotBlank
    private Long idUser;

	@NotBlank
	private String reportMessage;
    
	@NotBlank
    private String reportTitle;

	@NotBlank
	private String mood;

	@NotBlank
	private String symptomList;

	public String getCreatorName() {
		return this.creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}

	public Long getIdUser() {
		return this.idUser;
	}

	public void setIdUser(Long id) {
		this.idUser = id;
	}

	public String getReportMessage() {
		return this.reportMessage;
	}

	public void setReportMessage(String reportMessage) {
		this.reportMessage = reportMessage;
	}

	public String getReportTitle() {
		return this.reportTitle;
	}

	public void setReportTitle(String reportTitle) {
		this.reportTitle = reportTitle;
	}


	public String getMood() {
		return this.mood;
	}

	public void setMood(String mood) {
		this.mood = mood;
	}

	public String getSymptomList() {
		return this.symptomList;
	}

	public void setSymptomList(String symptomList) {
		this.symptomList = symptomList;
	}
}
