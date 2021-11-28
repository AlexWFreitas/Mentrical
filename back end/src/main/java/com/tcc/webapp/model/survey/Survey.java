package com.tcc.webapp.model.survey;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Surveys")
public class Survey {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "survey_questions", 
				joinColumns = @JoinColumn(name = "survey_id"), 
				inverseJoinColumns = @JoinColumn(name = "question_id"))
	private Set<Question> questions;

	private String name;
	
	@Enumerated(EnumType.STRING)
	private ESurveyType type;

	private Survey() {}

	public Survey(Set<Question> questions, String name, ESurveyType type) {
		this.questions = questions;
		this.name = name;
		this.type = type;
	}

	public Survey(String name, ESurveyType type) {
		this.name = name;
		this.type = type;
	}
	
	public Long getId() {
		return this.Id;
	}

	public void setId(Long Id) {
		this.Id = Id;
	}

	public Set<Question> getQuestions() {
		return this.questions;
	}

	public void setQuestions(Set<Question> questions) {
		this.questions = questions;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ESurveyType getType() {
		return this.type;
	}

	public void setType(ESurveyType type) {
		this.type = type;
	}
}
