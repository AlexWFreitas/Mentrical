package com.tcc.webapp.model.user;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.tcc.webapp.model.survey.Survey;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

// Represents an assigned Survey
@Entity
public class TreatmentSurvey {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(cascade = CascadeType.ALL)
	@JsonBackReference
	private UserTreatment userTreatment;

	private Boolean active = true;

	@OneToOne
	@JsonManagedReference
	private Survey survey;

	private TreatmentSurvey() {}

	public TreatmentSurvey(UserTreatment userTreatment, Boolean active, Survey survey) {
		this.userTreatment = userTreatment;
		this.active = active;
		this.survey = survey;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserTreatment getUserTreatment() {
		return this.userTreatment;
	}

	public void setUserTreatment(UserTreatment userTreatment) {
		this.userTreatment = userTreatment;
	}

	public Boolean isActive() {
		return this.active;
	}

	public Boolean getActive() {
		return this.active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Survey getSurvey() {
		return this.survey;
	}

	public void setSurvey(Survey survey) {
		this.survey = survey;
	}
}
