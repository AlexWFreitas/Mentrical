package com.tcc.webapp.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.tcc.webapp.model.survey.Answer;
import com.tcc.webapp.model.survey.Question;
import com.tcc.webapp.model.user.User;
import com.tcc.webapp.model.user.UserTreatment;
import com.tcc.webapp.payload.dto.JournalDTO;
import com.tcc.webapp.payload.dto.SurveyAnswerCollectionDTO;
import com.tcc.webapp.payload.dto.SurveyAnswerDTO;
import com.tcc.webapp.payload.dto.SurveyQuestionAnswerDTO;
import com.tcc.webapp.repository.UserRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/patients/")
public class PatientController {

	private final UserRepository userRepository;

	public PatientController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping("/{id}/surveys/full")
	public Optional<User> getSurveysFullInfoByPatientId(@PathVariable Long id)
	{
		return userRepository.findById(id);
	}

	@GetMapping("/{id}/surveys/")
	public SurveyAnswerCollectionDTO getSurveysByPatientId(@PathVariable Long id)
	{
		var user = userRepository.findById(id).get();

		var surveyCollectionDTO = new SurveyAnswerCollectionDTO();

		List<SurveyAnswerDTO> lstSurveyDTO = new ArrayList<>();

		surveyCollectionDTO.setIdUserAnswerer(user.getId());
		
		List<Question> lstQuestions = new ArrayList<>();

		List<UserTreatment> patientOfDoctorList = new ArrayList<>(user.getPatientOfDoctor());

		patientOfDoctorList.forEach((item) -> {
			item.getAssignedSurveys().forEach((assignedSurvey) -> {
				assignedSurvey.getSurvey().getQuestions().forEach(question -> {
					var newQuestion = new Question();

					List<Answer> listAnswers = new ArrayList<>(question.getQuestionAnswers());

					listAnswers.sort(Comparator.comparing(Answer::getId));
					Set<Answer> setAnswers = new HashSet<>();

					listAnswers.forEach(answerItem -> {
						setAnswers.add(answerItem);
					});

					newQuestion.setQuestionAnswers(setAnswers);
					newQuestion.setQuestionAttributes(question.getQuestionAttributes());
					newQuestion.setQuestion(question.getQuestion());
					newQuestion.setId(question.getId());					

					lstQuestions.add(newQuestion);
				});
			});

			item.getAnsweredSurveys().forEach((answeredSurvey) -> {

				var surveyAnswer = new SurveyAnswerDTO();
				surveyAnswer.setTotalPoints(0);;

				List<SurveyQuestionAnswerDTO> listQuestionAnswers = new ArrayList<>();
		
				surveyAnswer.setIdSurvey(answeredSurvey.getSurvey().getId());
				surveyAnswer.setIdSurveyAnswer(answeredSurvey.getId());
				surveyAnswer.setDateAnswered(answeredSurvey.getDateAnswered());
				surveyAnswer.setIdTreatment(item.getId());
				surveyAnswer.setIdUserAnswerer(answeredSurvey.getTreatedUser().getId());
				surveyAnswer.setSurveyName(answeredSurvey.getSurvey().getName());
				
				answeredSurvey.getSurveyUserAnswer().forEach((response) -> {
					var questionAnswerDTO = new SurveyQuestionAnswerDTO();
					questionAnswerDTO.setIdChosenAnswer(response.getChosenAnswer().getId());
					questionAnswerDTO.setIdQuestion(response.getQuestion().getId());
					questionAnswerDTO.setPoints(response.getChosenAnswer().getPoints());
					questionAnswerDTO.setValue(response.getChosenAnswer().getValue());
					questionAnswerDTO.setIdSurveyUserAnswer(response.getId());
					surveyAnswer.setTotalPoints(surveyAnswer.getTotalPoints() + response.getChosenAnswer().getPoints());

					listQuestionAnswers.add(questionAnswerDTO);
				});

				listQuestionAnswers.sort(Comparator.comparing(SurveyQuestionAnswerDTO::getIdSurveyUserAnswer));

				surveyAnswer.setSurveyUserAnswers(listQuestionAnswers);
				lstSurveyDTO.add(surveyAnswer);
			});
		});

		lstQuestions.sort(Comparator.comparing(Question::getId));
		lstSurveyDTO.sort(Comparator.comparing(SurveyAnswerDTO::getIdSurveyAnswer));

		surveyCollectionDTO.setSurveyQuestions(lstQuestions);
		surveyCollectionDTO.setSurveyAnswers(lstSurveyDTO);

		return surveyCollectionDTO;
	}

	@GetMapping("{id}/journals")
	public List<JournalDTO> getJournalsByPatientId(@PathVariable Long id)
	{
		var patient = userRepository.findById(id);

		var reports = patient.get().getReports();
		
		// List<Report> lstReports = new ArrayList<>(reports);

		List<JournalDTO> lstReports = new ArrayList<>();

		reports.forEach((item) -> {
			var journalDTO = new JournalDTO();
			journalDTO.setId(item.getId());
			journalDTO.setMood(item.getMood());
			journalDTO.setCreator(item.getCreator());
			journalDTO.setCreateDate(item.getCreateDate());
			journalDTO.setReportMessage(item.getReportMessage());
			journalDTO.setReportTitle(item.getReportTitle());
			journalDTO.setSymptomList(item.getSymptomList());

			lstReports.add(journalDTO);
		});
		

		lstReports.sort(Comparator.comparing(JournalDTO::getCreateDate));
		
		return lstReports;
	}
}
