package com.cryptocaddy.libraries.database.dao

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : CrudRepository<User, String> {

    fun findUserByUid(uid: String): User

}
