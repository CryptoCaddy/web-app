package com.cryptocaddy.services.auditing.db.repository;

import com.cryptocaddy.services.auditing.db.entity.Market;
import org.springframework.data.repository.CrudRepository;

public interface MarketRepository extends CrudRepository<Market, Integer> {
}
