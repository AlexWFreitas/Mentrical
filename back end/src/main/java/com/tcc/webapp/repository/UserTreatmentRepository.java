package com.tcc.webapp.repository;

import com.tcc.webapp.model.user.User;
import com.tcc.webapp.model.user.UserTreatment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTreatmentRepository extends JpaRepository<UserTreatment, Long> {
	
	public UserTreatment findByDoctor(User doctor);

}
