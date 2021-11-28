package com.tcc.webapp.repository;

import com.tcc.webapp.model.surveyResponse.SurveyResponse;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyResponseRepository extends JpaRepository<SurveyResponse, Long> {
	
}
