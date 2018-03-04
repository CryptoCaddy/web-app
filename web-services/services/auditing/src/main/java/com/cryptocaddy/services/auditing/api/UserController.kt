package com.cryptocaddy.services.auditing.api

import com.cryptocaddy.libraries.database.dao.User
import com.cryptocaddy.libraries.database.dao.UserRepository
import com.cryptocaddy.services.auditing.model.Result
import com.cryptocaddy.services.auditing.model.request.RequestCreateAccount
import com.cryptocaddy.services.common.authentication.JWTAuthenticator
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/users")
class UserController(val userRepository: UserRepository) {

    @GetMapping(value = "/{id}", produces = arrayOf("application/json"))
    fun getUser(@PathVariable("id") id: String): User? =
            userRepository.findOne(id)


    @PostMapping(value = "/add", produces = arrayOf("application/json"), consumes = arrayOf("application/json"))
    fun addUser(@RequestBody requestCreateAccount: RequestCreateAccount): ResponseEntity<Result?> {

        val jwtBody = JWTAuthenticator.getBodyFromToken(requestCreateAccount.token)
        val user = User(jwtBody.uid, jwtBody.email, jwtBody.name)
        userRepository.save(user)

        //TODO: more error handling
        val response = Result("Success")
        return ResponseEntity(response, HttpStatus.OK)

    }

}

