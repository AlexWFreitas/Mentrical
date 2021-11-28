package com.tcc.webapp.repository;

import com.tcc.webapp.model.survey.Survey;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
	
}
