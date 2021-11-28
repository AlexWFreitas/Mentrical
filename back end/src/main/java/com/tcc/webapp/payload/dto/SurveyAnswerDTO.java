package com.tcc.webapp.payload.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.tcc.webapp.model.survey.Question;

public class SurveyAnswerDTO {

	private Long idSurveyAnswer;

	private Long idSurvey;

	private Long idUserAnswerer;

	private Long idTreatment;

	private String surveyName;

	private List<SurveyQuestionAnswerDTO> surveyUserAnswers;

	private LocalDateTime dateAnswered;

	private Integer totalPoints;

	public Long getIdSurvey() {
		return this.idSurvey;
	}

	public void setIdSurvey(Long idSurvey) {
		this.idSurvey = idSurvey;
	}

	public Long getIdSurveyAnswer() {
		return this.idSurveyAnswer;
	}

	public void setIdSurveyAnswer(Long idSurveyAnswer) {
		this.idSurveyAnswer = idSurveyAnswer;
	}

	public Long getIdUserAnswerer() {
		return this.idUserAnswerer;
	}

	public void setIdUserAnswerer(Long idUserAnswerer) {
		this.idUserAnswerer = idUserAnswerer;
	}

	public Long getIdTreatment() {
		return this.idTreatment;
	}

	public void setIdTreatment(Long idTreatment) {
		this.idTreatment = idTreatment;
	}

	public String getSurveyName() {
		return this.surveyName;
	}

	public void setSurveyName(String surveyName) {
		this.surveyName = surveyName;
	}

	public List<SurveyQuestionAnswerDTO> getSurveyUserAnswers() {
		return this.surveyUserAnswers;
	}

	public void setSurveyUserAnswers(List<SurveyQuestionAnswerDTO> surveyUserAnswers) {
		this.surveyUserAnswers = surveyUserAnswers;
	}

	public LocalDateTime getDateAnswered() {
		return this.dateAnswered;
	}

	public void setDateAnswered(LocalDateTime dateAnswered) {
		this.dateAnswered = dateAnswered;
	}

	public Integer getTotalPoints() {
		return this.totalPoints;
	}

	public void setTotalPoints(Integer totalPoints) {
		this.totalPoints = totalPoints;
	}
}
