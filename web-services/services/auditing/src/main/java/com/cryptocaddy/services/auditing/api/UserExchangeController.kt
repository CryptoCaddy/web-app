package com.cryptocaddy.services.auditing.api

import com.cryptocaddy.libraries.database.dao.UserExchange
import com.cryptocaddy.services.auditing.dto.response.Result
import com.cryptocaddy.services.auditing.dto.request.RequestAddExchange
import com.cryptocaddy.services.auditing.dto.response.ResponseExchangeWrapper
import com.cryptocaddy.services.auditing.dto.response.ResponseUserData
import com.cryptocaddy.services.auditing.service.UserExchangeService
import com.cryptocaddy.services.common.authentication.JWTAuthenticator
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/user-exchange")
//@RequestMapping("/")
class UserExchangeController(val userExchangeService: UserExchangeService) {

    @GetMapping(value = ["/{id}"], produces = ["application/json"])
    fun getUserExchange(@PathVariable("id") id: Long): UserExchange? =
            userExchangeService.userExchangeRepository.findOne(id)




    @PostMapping(value = ["/add"], produces = ["application/json"], consumes = ["application/json"])
    fun addUserExchange(@RequestHeader(value = "Authorization") authorization: String, @RequestBody requestAddExchange: RequestAddExchange): ResponseEntity<ResponseExchangeWrapper> {
        val jwtBody = JWTAuthenticator.getBodyFromToken(authorization)
        val response = userExchangeService.addUserExchange(jwtBody, requestAddExchange)
        //TODO: more error handling

        return if (response != null) ResponseEntity(response, HttpStatus.OK) else ResponseEntity(null, HttpStatus.BAD_REQUEST)
    }

    @PostMapping(value = ["/remove"], produces = ["application/json"])
    fun removeUserExchange(@RequestHeader(value="Authorization") authorization: String, @RequestParam exchangeIdRemove: Long): ResponseEntity<Result?> {

        val jwtBody = JWTAuthenticator.getBodyFromToken(authorization)
        val response = userExchangeService.removeUserExchange(jwtBody, exchangeIdRemove)
        //TODO: more error handling
        return if (response != null) ResponseEntity(response, HttpStatus.OK) else ResponseEntity(null, HttpStatus.BAD_REQUEST)
    }

    @GetMapping(value = ["/wallets"], produces = ["application/json"])
    fun getWallets(@RequestHeader(value="Authorization") authorization: String): ResponseEntity<ResponseUserData?> {

        val jwtBody = JWTAuthenticator.getBodyFromToken(authorization)
        val response = userExchangeService.getExchangeWallets(jwtBody)
        //TODO: more error handling
        return if (response != null) ResponseEntity(response, HttpStatus.OK) else ResponseEntity(null, HttpStatus.BAD_REQUEST)
    }

    @GetMapping(value = ["/trades"], produces = ["application/json"])
    fun getTrades(@RequestHeader(value="Authorization") authorization: String): ResponseEntity<ResponseUserData?> {

        val jwtBody = JWTAuthenticator.getBodyFromToken(authorization)
        val response = userExchangeService.getExchangeTrades(jwtBody)
        //TODO: more error handling
        return if (response != null) ResponseEntity(response, HttpStatus.OK) else ResponseEntity(null, HttpStatus.BAD_REQUEST)
    }

}