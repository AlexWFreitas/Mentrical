package com.tcc.webapp.model.report;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.tcc.webapp.model.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table( name = "reports" )
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	private String reportTitle;

	@NotBlank
	@Column(length = 4000)
	private String reportMessage;

	@NotBlank
	private String mood;

	@NotBlank
	private LocalDateTime createDate;

	@NotBlank
	private String symptomList;
	
	@NotBlank
	@ManyToOne
	@JsonBackReference(value="user-reports")
	@JoinColumn(name="user_id", 
				nullable=false)
	private User creator;

	public Report() {};

	public Report(String reportTitle, String reportMessage, String mood, String symptomList, User creator) {
		this.reportTitle = reportTitle;
		this.reportMessage = reportMessage;
		this.mood = mood;
		this.createDate = LocalDateTime.now();
		this.symptomList = symptomList;
		this.creator = creator;
	}

	public Report(String reportTitle, String reportMessage, String mood, String symptomList) {
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

	public User getCreator() {
		return this.creator;
	}

	public void setCreator(User creator) {
		this.creator = creator;
	}
	
}
