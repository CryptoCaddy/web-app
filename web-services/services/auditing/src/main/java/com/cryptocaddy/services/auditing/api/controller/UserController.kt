package com.cryptocaddy.services.auditing.api.controller

import com.cryptocaddy.services.auditing.database.entity.User
import com.cryptocaddy.services.auditing.database.repository.UserRepository
import com.cryptocaddy.services.auditing.api.dto.response.Result
import com.cryptocaddy.services.auditing.api.dto.request.RequestCreateAccount
import com.cryptocaddy.services.auditing.restconfig.authentication.FirebaseTokenHandler
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/users")
class UserController(val userRepository: UserRepository) {

    @GetMapping(value = ["/{id}"], produces = ["application/json"])
    fun getUser(@PathVariable("id") id: String): User? =
            userRepository.findOne(id)


    @PostMapping(value = ["/add"], produces = ["application/json"], consumes = ["application/json"])
    fun addUser(@RequestBody requestCreateAccount: RequestCreateAccount): ResponseEntity<Result?> {

        val jwtBody = FirebaseTokenHandler.getBodyFromToken(requestCreateAccount.token)
        val user = User(jwtBody.uid, jwtBody.email, jwtBody.name)
        userRepository.save(user)

        //TODO: more error handling
        val response = Result("Success")
        return ResponseEntity(response, HttpStatus.OK)

    }

}

