package com.tcc.webapp.controller;

import java.util.Optional;

import com.tcc.webapp.model.survey.Survey;
import com.tcc.webapp.repository.SurveyRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/surveys/")
@RestController
public class SurveyController {
	
	private final SurveyRepository surveyRepository;

	public SurveyController(SurveyRepository surveyRepository) {
		this.surveyRepository = surveyRepository;
	}

	@GetMapping("/{id}")
	public Optional<Survey> getSurveyById(@PathVariable Long id)
	{
		return surveyRepository.findById(id);	
	}

	
}
