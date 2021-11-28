package com.tcc.webapp.repository;

import com.tcc.webapp.model.appointment.Appointment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	
}
