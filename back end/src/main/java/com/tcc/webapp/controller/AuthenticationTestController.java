package com.tcc.webapp.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/test")
public class AuthenticationTestController {
	
	@GetMapping("/all")
	@PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR')")
	public String allAccess() {
		return "Authenticated";
	}
	
	@GetMapping("/patient")
	@PreAuthorize("hasRole('PATIENT')")
	public String patientAccess() {
		return "Authenticated";
	}

	@GetMapping("/doctor")
	@PreAuthorize("hasRole('DOCTOR')")
	public String doctorAccess() {
		return "Authenticated";
	}
}
