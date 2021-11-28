package com.tcc.webapp.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.tcc.webapp.model.appointment.Appointment;
import com.tcc.webapp.payload.dto.ScheduleDTO;
import com.tcc.webapp.payload.response.DoctorSchedule;
import com.tcc.webapp.payload.response.MessageResponse;
import com.tcc.webapp.repository.AppointmentRepository;
import com.tcc.webapp.repository.UserTreatmentRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/")
public class ScheduleController {

	private final UserTreatmentRepository userTreatmentRepository;
	private final AppointmentRepository appointmentRepository;

	public ScheduleController(UserTreatmentRepository userTreatmentRepository, AppointmentRepository appointmentRepository) {
		this.userTreatmentRepository = userTreatmentRepository;
		this.appointmentRepository = appointmentRepository;
	}

	@PostMapping("/treatments/{id}")
	public Appointment postSchedule(@PathVariable Long id, @RequestBody DoctorSchedule schedule)
	{
		var userTreatment = userTreatmentRepository.findById(id).get();

		var newAppointment = new Appointment(schedule.getDataConsulta(), "");
		
		// Necessita salvar através do repositório da Entidade para poder recuperar o id de inserção
		newAppointment.setDoctorPatientPair(userTreatment);

		appointmentRepository.save(newAppointment);

		return newAppointment;
	}

	@DeleteMapping("/schedules/{id}")
	public ResponseEntity<?> deleteSchedule(@PathVariable Long id)
	{
		appointmentRepository.deleteById(id);

		return ResponseEntity.ok(new MessageResponse("Consulta deletada com succeso!"));
	}

	@PutMapping("/schedules/{id}")
	public ResponseEntity<?> updateSchedule(@PathVariable Long id, @RequestBody ScheduleDTO scheduleDTO)
	{
		var schedule = appointmentRepository.findById(id).get();
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime dateTime = LocalDateTime.parse(scheduleDTO.getScheduleDate(), formatter);

		schedule.setAppointmentDate(dateTime);
		schedule.setStatus(scheduleDTO.getStatus());
		schedule.setAppointmentAnnotation(scheduleDTO.getScheduleNotes());

		appointmentRepository.save(schedule);

		return ResponseEntity.ok(new MessageResponse("Schedule edited successfully."));
	}
}
