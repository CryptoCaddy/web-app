package com.cryptocaddy.libraries.database.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface UserExchangeRepository extends CrudRepository<UserExchange, Long> {

    //find all exchanges for a user
    List<UserExchange> findByUser(User user);

    //find by the primary key
    UserExchange findById(Long Id);

    void removeById(Long Id);

}
