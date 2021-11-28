package com.tcc.webapp.payload.dto;

import java.time.LocalDateTime;

import com.tcc.webapp.model.user.User;

public class JournalUpdateDTO {
	
	private Long id;

	private String reportTitle;

	private String reportMessage;

	private String mood;

	private LocalDateTime createDate;

	private String symptomList;

	private JournalUpdateDTO() {};
	
	public JournalUpdateDTO(String reportTitle, String reportMessage, String mood, String symptomList) {
		this.reportTitle = reportTitle;
		this.reportMessage = reportMessage;
		this.mood = mood;
		this.createDate = LocalDateTime.now();
		this.symptomList = symptomList;
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

	public String getMood() {
		return this.mood;
	}

	public void setMood(String mood) {
		this.mood = mood;
	}

	public LocalDateTime getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public String getSymptomList() {
		return this.symptomList;
	}

	public void setSymptomList(String symptomList) {
		this.symptomList = symptomList;
	}
}
