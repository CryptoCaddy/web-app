package com.cryptocaddy.services.auditing.db.repository;

import com.cryptocaddy.services.auditing.db.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
