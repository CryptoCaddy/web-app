package com.cryptocaddy.services.auditing.database.repository

import com.cryptocaddy.services.auditing.database.entity.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : CrudRepository<User, String> {

    fun findUserByUid(uid: String): User

}
