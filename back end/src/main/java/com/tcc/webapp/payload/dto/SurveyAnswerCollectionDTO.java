package com.tcc.webapp.payload.dto;

import java.util.List;

import com.tcc.webapp.model.survey.Question;

public class SurveyAnswerCollectionDTO {

	private Long idUserAnswerer;

	private List<SurveyAnswerDTO> surveyAnswers;

	private List<Question> surveyQuestions;

	public Long getIdUserAnswerer() {
		return this.idUserAnswerer;
	}

	public void setIdUserAnswerer(Long idUserAnswerer) {
		this.idUserAnswerer = idUserAnswerer;
	}

	public List<SurveyAnswerDTO> getSurveyAnswers() {
		return this.surveyAnswers;
	}

	public void setSurveyAnswers(List<SurveyAnswerDTO> surveyAnswers) {
		this.surveyAnswers = surveyAnswers;
	}

	public List<Question> getSurveyQuestions() {
		return this.surveyQuestions;
	}

	public void setSurveyQuestions(List<Question> surveyQuestions) {
		this.surveyQuestions = surveyQuestions;
	}
	
}
