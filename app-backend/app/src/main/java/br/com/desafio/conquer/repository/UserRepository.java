package br.com.desafio.conquer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import br.com.desafio.conquer.model.UserModel;

@Repository
public interface UserRepository extends PagingAndSortingRepository<UserModel, Long>{
	@Query("SELECT u FROM UserModel u WHERE u.name LIKE %?1%")
	public List<UserModel> findByName(String name);
}
