package com.cryptocaddy.services.auditing.db.repository;

import com.cryptocaddy.services.auditing.db.entity.UserExchange;
import org.springframework.data.repository.CrudRepository;

public interface UserExchangeRepository extends CrudRepository<UserExchange, Integer> {
}
