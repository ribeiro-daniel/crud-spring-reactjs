package br.com.desafio.conquer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.desafio.conquer.model.UserModel;
import br.com.desafio.conquer.repository.UserRepository;


@CrossOrigin
@RestController
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@RequestMapping(method = RequestMethod.GET, value = "/api/users")
	public Iterable<UserModel> getUser(@PageableDefault(page = 0, size = 5) Pageable pageable) {	
		return userRepository.findAll(pageable);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/api/users/name")
	public List<UserModel> findByName(@RequestParam(value = "name") String name) {	
		return userRepository.findByName(name);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/api/users/{id}")
	public UserModel getById(@PathVariable(value="id") Long id) {		
		return userRepository.findById(id).get();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/api/users")
	public UserModel save(@RequestBody UserModel user) {
		return userRepository.save(user);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/api/users/{id}")
	public ResponseEntity<UserModel> update(@RequestBody UserModel newUser, @PathVariable("id") Long id){
		return userRepository.findById(id)
			.map(user -> {
				user.setName(newUser.getName());
				user.setEmail(newUser.getEmail());
				user.setPhone(newUser.getPhone());
				user.setBirthday(newUser.getBirthday());
				UserModel updatedUser = userRepository.save(user);
				return ResponseEntity.ok().body(updatedUser);
		}).orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping(value = "/api/users/{id}", produces = "application/text")
	public ResponseEntity<?> deleteById(@PathVariable("id") @RequestBody Long id) {
			
		return userRepository.findById(id).map(u -> {
			userRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
		
	}
	
}
