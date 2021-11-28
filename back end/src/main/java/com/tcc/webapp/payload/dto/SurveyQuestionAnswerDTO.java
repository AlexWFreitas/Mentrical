package com.tcc.webapp.payload.dto;

public class SurveyQuestionAnswerDTO {

	private Long idQuestion;
	private Long idChosenAnswer;
	private Long idSurveyUserAnswer;
	private Integer points;
	private String value;


	public Long getIdQuestion() {
		return this.idQuestion;
	}

	public void setIdQuestion(Long idQuestion) {
		this.idQuestion = idQuestion;
	}

	public Long getIdChosenAnswer() {
		return this.idChosenAnswer;
	}

	public Long getIdSurveyUserAnswer() {
		return this.idSurveyUserAnswer;
	}

	public void setIdSurveyUserAnswer(Long idSurveyUserAnswer) {
		this.idSurveyUserAnswer = idSurveyUserAnswer;
	}

	public void setIdChosenAnswer(Long idChosenAnswer) {
		this.idChosenAnswer = idChosenAnswer;
	}

	public Integer getPoints() {
		return this.points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}

	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
