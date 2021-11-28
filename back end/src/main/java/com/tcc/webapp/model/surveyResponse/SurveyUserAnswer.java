package com.tcc.webapp.model.surveyResponse;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.tcc.webapp.model.survey.Answer;
import com.tcc.webapp.model.survey.Question;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class SurveyUserAnswer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JsonBackReference
	private SurveyResponse surveyResponse;
	
	@OneToOne
	private Question question;

	@OneToOne
	private Answer chosenAnswer;
	
	private SurveyUserAnswer() {};

	public SurveyUserAnswer(Long id, SurveyResponse surveyResponse, Question question, Answer chosenAnswer) {
		this.surveyResponse = surveyResponse;
		this.question = question;
		this.chosenAnswer = chosenAnswer;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public SurveyResponse getSurveyResponse() {
		return this.surveyResponse;
	}

	public void setSurveyResponse(SurveyResponse surveyResponse) {
		this.surveyResponse = surveyResponse;
	}

	public Question getQuestion() {
		return this.question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public Answer getChosenAnswer() {
		return this.chosenAnswer;
	}

	public void setChosenAnswer(Answer chosenAnswer) {
		this.chosenAnswer = chosenAnswer;
	}	
}
