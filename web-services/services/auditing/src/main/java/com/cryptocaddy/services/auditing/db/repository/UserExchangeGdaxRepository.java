package com.cryptocaddy.services.auditing.db.repository;

import com.cryptocaddy.services.auditing.db.entity.UserExchange;
import com.cryptocaddy.services.auditing.db.entity.UserExchangeGdax;
import org.springframework.data.repository.CrudRepository;

public interface UserExchangeGdaxRepository extends CrudRepository<UserExchangeGdax, Integer> {
}
