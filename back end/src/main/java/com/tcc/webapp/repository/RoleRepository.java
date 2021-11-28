package com.tcc.webapp.repository;

import java.util.Optional;

import com.tcc.webapp.model.user.ERole;
import com.tcc.webapp.model.user.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
