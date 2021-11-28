package com.tcc.webapp.model.surveyResponse;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.tcc.webapp.model.survey.Survey;
import com.tcc.webapp.model.user.UserTreatment;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class SurveyResponse {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JsonBackReference
	private UserTreatment treatedUser;

	@OneToOne
	private Survey survey;

	private LocalDateTime dateAnswered;

	@OneToMany(mappedBy = "surveyResponse")
	@JsonManagedReference
	private Set<SurveyUserAnswer> surveyUserAnswer;

	private SurveyResponse() {}

	public SurveyResponse(UserTreatment treatedUser, Survey survey, Set<SurveyUserAnswer> surveyUserAnswer) {
		this.treatedUser = treatedUser;
		this.survey = survey;
		this.surveyUserAnswer = surveyUserAnswer;
		this.dateAnswered = LocalDateTime.now();
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserTreatment getTreatedUser() {
		return this.treatedUser;
	}

	public void setTreatedUser(UserTreatment treatedUser) {
		this.treatedUser = treatedUser;
	}

	public Survey getSurvey() {
		return this.survey;
	}

	public void setSurvey(Survey survey) {
		this.survey = survey;
	}

	public Set<SurveyUserAnswer> getSurveyUserAnswer() {
		return this.surveyUserAnswer;
	}

	public void setSurveyUserAnswer(Set<SurveyUserAnswer> surveyUserAnswer) {
		this.surveyUserAnswer = surveyUserAnswer;
	}

	public LocalDateTime getDateAnswered() {
		return this.dateAnswered;
	}

	public void setDateAnswered(LocalDateTime dateAnswered) {
		this.dateAnswered = dateAnswered;
	}

}
