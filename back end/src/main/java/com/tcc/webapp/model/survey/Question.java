package com.tcc.webapp.model.survey;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String question;

	@OneToMany(mappedBy = "question")
	private Set<QuestionAttribute> questionAttributes;

	@OneToMany(mappedBy = "question")
	@JsonManagedReference
	private Set<Answer> questionAnswers;

	public Question() {}

	public Question(String question, Set<QuestionAttribute> questionAttributes, Set<Answer> questionAnswers) {
		this.question = question;
		this.questionAttributes = questionAttributes;
		this.questionAnswers = questionAnswers;
	}

	public Question(String question) {
		this.question = question;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQuestion() {
		return this.question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public Set<QuestionAttribute> getQuestionAttributes() {
		return this.questionAttributes;
	}

	public void setQuestionAttributes(Set<QuestionAttribute> questionAttributes) {
		this.questionAttributes = questionAttributes;
	}

	public Set<Answer> getQuestionAnswers() {
		return this.questionAnswers;
	}

	public void setQuestionAnswers(Set<Answer> questionAnswers) {
		this.questionAnswers = questionAnswers;
	}
	
}
