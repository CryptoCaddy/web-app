package com.cryptocaddy.services.auditing.db.repository;

import com.cryptocaddy.services.auditing.db.entity.Currency;
import org.springframework.data.repository.CrudRepository;

public interface CurrencyRepository extends CrudRepository<Currency, Integer> {
}
