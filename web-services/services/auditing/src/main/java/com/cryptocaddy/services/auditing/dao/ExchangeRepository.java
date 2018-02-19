package com.cryptocaddy.services.auditing.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExchangeRepository extends CrudRepository<Exchange, String> {

    Exchange findExchangeByXid(String xid);

}
