package com.tcc.webapp.model.survey;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Attribute {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long id;

	private String name;

	@OneToMany(mappedBy = "attribute")
	private Set<QuestionAttribute> questionAttributes;

	public Attribute(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<QuestionAttribute> getQuestionAttributes() {
		return this.questionAttributes;
	}

	public void setQuestionAttributes(Set<QuestionAttribute> questionAttributes) {
		this.questionAttributes = questionAttributes;
	}
}
