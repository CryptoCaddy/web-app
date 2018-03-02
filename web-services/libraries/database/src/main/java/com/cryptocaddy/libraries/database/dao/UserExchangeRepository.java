package com.cryptocaddy.libraries.database.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserExchangeRepository extends CrudRepository<UserExchange, String> {

    //find all exchanges for a user
    List<UserExchange> findByUser(User user);

    //find by the primary key
    UserExchange findById(long Id);

    Void removeById(long Id);

}
