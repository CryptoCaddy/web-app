package com.cryptocaddy.services.auditing.db.repository;

import com.cryptocaddy.services.auditing.db.entity.Exchange;
import org.springframework.data.repository.CrudRepository;

public interface ExchangeRepository extends CrudRepository<Exchange, Integer> {
}
