package com.tcc.webapp.controller;

import java.util.Optional;

import com.tcc.webapp.model.user.User;
import com.tcc.webapp.payload.request.SignupRequest;
import com.tcc.webapp.payload.response.MessageResponse;
import com.tcc.webapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping("/{id}")
	public Optional<User> getUserById(@PathVariable Long id) {
		return userRepository.findById(id);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
		userRepository.deleteById(id);

		return ResponseEntity.ok(new MessageResponse("User deleted successfully!"));
	}

	@PutMapping("/{id}")
	public User updateUser(@RequestBody SignupRequest user, @PathVariable Long id)
	{
		var userOrig = userRepository.findById(id).get();
		//userOrig.setUsername(user.getUsername());
		userOrig.setEmail(user.getEmail());
		userOrig.setFirstName(user.getFirstName());
		userOrig.setLastName(user.getLastName());
		userOrig.setContactNumber(user.getContactNumber());
		//userOrig.setIdentificationInfo(user.getIdentificationInfo());

		userRepository.save(userOrig);

		return userOrig;		
	}
}
