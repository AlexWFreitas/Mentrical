package com.tcc.webapp.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.tcc.webapp.model.report.Report;
import com.tcc.webapp.payload.dto.JournalUpdateDTO;
import com.tcc.webapp.payload.request.CreateReportRequest;
import com.tcc.webapp.payload.response.MessageResponse;
import com.tcc.webapp.payload.response.ReportResponse;
import com.tcc.webapp.repository.ReportRepository;
import com.tcc.webapp.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/reports/")
public class ReportController {

	private final ReportRepository reportRepository;
	private final UserRepository userRepository;

	public ReportController(ReportRepository reportRepository, UserRepository userRepository) {
		this.reportRepository = reportRepository;
		this.userRepository = userRepository;
	}

	@GetMapping
	@PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR')")
	public List<ReportResponse> GetAllReports() {
		var reports = reportRepository.findAll();
		
		List<ReportResponse> listReportDTO = new ArrayList<>();

		reports.forEach(report -> {
			var reportDTO = new ReportResponse(report.getId(), 
											   report.getReportTitle(),
											   report.getReportMessage(),
											   report.getCreateDate(), 
											   report.getMood(),
											   report.getSymptomList(),
											   report.getCreator().getId(), 
											   report.getCreator().getFullName());
			listReportDTO.add(reportDTO);
		});

		return listReportDTO;
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR')")
	public ReportResponse GetReportById(@PathVariable Long id) {

		var report = reportRepository.findById(id).get();
		
		if (report != null)
		{
			var reportResponse = new ReportResponse(report.getId(), 
													report.getReportTitle(), 
													report.getReportMessage(), 
													report.getCreateDate(), 
													report.getMood(),
													report.getSymptomList(),
													report.getCreator().getId(), 
													report.getCreator().getFullName());
			
			return reportResponse;
		}	
		else return null;
	}

	@PutMapping(value="/{id}")	
	@PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR')")
	public Report updateReport(@PathVariable Long id, @RequestBody JournalUpdateDTO report) {
		var original = reportRepository.findById(id).get();

		original.setMood(report.getMood());
		original.setCreateDate(LocalDateTime.now());
		original.setReportMessage(report.getReportMessage());
		original.setReportTitle(report.getReportTitle());

		return reportRepository.save(original);
	}

	@PostMapping
	@PreAuthorize("hasRole('PATIENT')")
	public ResponseEntity<?> createReport(@Valid @RequestBody CreateReportRequest createReportRequest) {

		// Retrieve User [ Creator ]
		var creator = userRepository.findById(createReportRequest.getIdUser());

		// Create new Report
		Report report = new Report(	
									createReportRequest.getReportTitle(), 
									createReportRequest.getReportMessage(), 
									createReportRequest.getMood(),
									createReportRequest.getSymptomList(),								
									creator.get());

		reportRepository.save(report);

		return ResponseEntity.ok(new MessageResponse("Report registered successfully!"));
		
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('PATIENT')")
	public ResponseEntity<?> deleteReport(@PathVariable Long id)
	{
		reportRepository.deleteById(id);

		return ResponseEntity.ok(new MessageResponse("Report deleted successfully!"));
	}
}
