package com.tcc.webapp.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.tcc.webapp.model.user.ERole;
import com.tcc.webapp.model.user.Role;
import com.tcc.webapp.model.user.User;
import com.tcc.webapp.payload.dto.UserRefreshDTO;
import com.tcc.webapp.payload.request.LoginRequest;
import com.tcc.webapp.payload.request.SignupRequest;
import com.tcc.webapp.payload.response.JwtResponse;
import com.tcc.webapp.payload.response.MessageResponse;
import com.tcc.webapp.repository.RoleRepository;
import com.tcc.webapp.repository.UserRepository;
import com.tcc.webapp.security.jwt.JwtUtils;
import com.tcc.webapp.security.services.UserDetailsImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);		
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		

		Optional<User> user = userRepository.findByUsername((userDetails.getUsername()));

		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 	
												 user.get().getContactNumber(),
												 user.get().getIdentificationInfo(),											 
												 roles,
												 user.get().getFirstName(),
												 user.get().getLastName()));
	}

	@PostMapping("/refresh")
	public ResponseEntity<?> refreshUserProfile(@Valid @RequestBody LoginRequest loginRequest) {

		Optional<User> user = userRepository.findByUsername((loginRequest.getUsername()));

		return ResponseEntity.ok(new UserRefreshDTO( 	user.get().getEmail(),
														user.get().getContactNumber(),
														user.get().getFirstName(),
														user.get().getLastName()));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 signUpRequest.getContactNumber(),
							 signUpRequest.getIdentificationInfo(),
							 signUpRequest.getFirstName(),
							 signUpRequest.getLastName(),
							 encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role patientRole = roleRepository.findByName(ERole.ROLE_PATIENT)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(patientRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
					case "doctor":
						Role doctorRole = roleRepository.findByName(ERole.ROLE_DOCTOR)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(doctorRole);
						break;
						
					default:
						Role patientRole = roleRepository.findByName(ERole.ROLE_PATIENT)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(patientRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
		userRepository.deleteById(id);

		return ResponseEntity.ok(new MessageResponse("User deleted successfully!"));
	}


}
