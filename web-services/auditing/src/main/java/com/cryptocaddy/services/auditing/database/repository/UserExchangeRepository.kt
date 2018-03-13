package com.cryptocaddy.services.auditing.database.repository

import com.cryptocaddy.services.auditing.database.entity.User
import com.cryptocaddy.services.auditing.database.entity.UserExchange
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

import javax.transaction.Transactional

@Repository
@Transactional
interface UserExchangeRepository : CrudRepository<UserExchange, Long> {

    //find all exchanges for a user
    fun findByUser(user: User): List<UserExchange>

    //find by the primary key
    fun findById(Id: Long?): UserExchange

    fun removeById(Id: Long?)

}
