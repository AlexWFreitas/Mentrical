package com.tcc.webapp.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.tcc.webapp.model.appointment.Appointment;
import com.tcc.webapp.payload.dto.UserTreatmentDTO;
import com.tcc.webapp.payload.response.DoctorAppointment;
import com.tcc.webapp.payload.response.DoctorSchedule;
import com.tcc.webapp.payload.response.DoctorTreatments;
import com.tcc.webapp.payload.response.IntegerJson;
import com.tcc.webapp.repository.UserRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

	private final UserRepository userRepository;

	public DoctorController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	/*
	@GetMapping("/{id}/patients")
	public List<User> getPatientsByDoctorId(@PathVariable Long id) {
		var doctor =  userRepository.findById(id);
		
		List<User> lstPatients = new ArrayList<>();

		doctor.get().getDoctorOfPatients().forEach(item -> {
			if (!lstPatients.contains(item.getPatient()))
			{
				lstPatients.add(item.getPatient());
			}
			
		});

		return lstPatients;
	}
	*/

	@GetMapping("/{id}/treatments")
	public DoctorTreatments getDoctorTreaments(@PathVariable Long id) {

		var doctor = userRepository.findById(id);

		DoctorTreatments result = new DoctorTreatments(id);		

		doctor.get().getDoctorOfPatients().forEach(item -> {
			
			var utDTO = new UserTreatmentDTO(item.getDoctor().getId(), item.getPatient().getId(), item.getId(), item.getPatient().getFullName());
			result.getDoctorTreatments().add(utDTO);
		});

		return result;
	}

	@GetMapping("/{id}/scheduleCount")
	public IntegerJson getScheduleCount(@PathVariable Long id) {
		var doctor =  userRepository.findById(id);

		List<DoctorSchedule> listSchedules = new ArrayList<>();

		doctor.get().getDoctorOfPatients().forEach(item -> 
		{
			List<Appointment> listAppointments = new ArrayList<>(item.getPatient().getPatientOfDoctor().iterator().next().getAppointments());

			listAppointments.forEach(x -> {
				var objApp = new DoctorSchedule();
				objApp.setIdPaciente(item.getPatient().getId());
				objApp.setIdConsulta(x.getId());
				objApp.setFirstName(item.getPatient().getFirstName());
				objApp.setLastName(item.getPatient().getLastName());
				objApp.setDataConsulta(x.getAppointmentDate());
				objApp.setStatusConsulta(x.getStatus());
				objApp.setNotesConsulta(x.getAppointmentAnnotation());
				objApp.setContatoPaciente(item.getPatient().getContactNumber());
				listSchedules.add(objApp);
			});
		});

		var result = new IntegerJson(listSchedules.size());
		
		return result;
	}

	@GetMapping("/{id}/schedules")
	public List<DoctorSchedule> getSchedules(@PathVariable Long id) {
		var doctor =  userRepository.findById(id);

		List<DoctorSchedule> listSchedules = new ArrayList<>();

		doctor.get().getDoctorOfPatients().forEach(item -> 
		{
			List<Appointment> listAppointments = new ArrayList<>(item.getPatient().getPatientOfDoctor().iterator().next().getAppointments());

			listAppointments.forEach(x -> {
				//if (x.getAppointmentDate().isAfter(LocalDateTime.now()))
				{
					var objApp = new DoctorSchedule();
					objApp.setIdPaciente(item.getPatientIdUser());					
					objApp.setIdConsulta(x.getId());
					objApp.setFirstName(item.getPatient().getFirstName());
					objApp.setLastName(item.getPatient().getLastName());
					objApp.setDataConsulta(x.getAppointmentDate());
					objApp.setStatusConsulta(x.getStatus());
					objApp.setNotesConsulta(x.getAppointmentAnnotation());
					objApp.setContatoPaciente(item.getPatient().getContactNumber());
					listSchedules.add(objApp);
				}
			});
		});
		
		listSchedules.sort(Comparator.comparing(DoctorSchedule::getDataConsulta));
		
		return listSchedules;
	}

	@GetMapping("/{id}/patients")
	public List<DoctorAppointment> getPatientsByDoctorId(@PathVariable Long id) {
		var doctor =  userRepository.findById(id);
		
		List<DoctorAppointment> lstPatients = new ArrayList<>();

		doctor.get().getDoctorOfPatients().forEach(item -> 
		{
			var objApp = new DoctorAppointment();
			objApp.setIdPatient(item.getPatient().getId());
			objApp.setFullName(item.getPatient().getFullName());
			objApp.setEmail(item.getPatient().getEmail());
			objApp.setContactNumber(item.getPatient().getContactNumber());
			objApp.setFirstName(item.getPatient().getFirstName());
			objApp.setLastName(item.getPatient().getLastName());
			objApp.setIdTreatment(item.getId());
			
			List<Appointment> listAppointments = new ArrayList<>(item.getPatient().getPatientOfDoctor().iterator().next().getAppointments());
			
			List<Appointment> lowestAppointment = new ArrayList<>();

			var xDateTime = LocalDateTime.of(9999, 1, 1, 1, 1);

			var dummyApp = new Appointment(xDateTime, "a");
			
			lowestAppointment.add(dummyApp);

			listAppointments.forEach(x -> {
				if (x.getAppointmentDate().isBefore(lowestAppointment.get(0).getAppointmentDate()) && x.getAppointmentDate().isAfter(LocalDateTime.now()))
				{
					lowestAppointment.get(0).setId(x.getId());
					lowestAppointment.get(0).setAppointmentDate(x.getAppointmentDate());
					lowestAppointment.get(0).setAppointmentAnnotation(x.getAppointmentAnnotation());
				}
			});

			Set<Appointment> consultas = new HashSet<>();			
			consultas.add(lowestAppointment.get(0));

			if (lowestAppointment.get(0).getAppointmentDate().isAfter(LocalDateTime.of(5000,1,1,1,1)))
			{
				consultas.clear();
			}

			objApp.setConsultas(consultas);

			lstPatients.add(objApp);
		});
		
		lstPatients.sort(Comparator.comparing(DoctorAppointment::getFirstName));

		return lstPatients;
	}
}
