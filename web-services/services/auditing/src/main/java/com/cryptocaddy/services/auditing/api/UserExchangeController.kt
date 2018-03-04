package com.cryptocaddy.services.auditing.api

import com.cryptocaddy.libraries.database.dao.User
import com.cryptocaddy.libraries.database.dao.UserExchange
import com.cryptocaddy.libraries.database.dao.UserExchangeRepository
import com.cryptocaddy.libraries.database.dao.UserRepository
import com.cryptocaddy.services.auditing.model.Result
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange
import com.cryptocaddy.services.auditing.model.request.RequestCreateAccount
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper
import com.cryptocaddy.services.auditing.model.response.ResponseUserData
import com.cryptocaddy.services.auditing.service.UserExchangeService
import com.cryptocaddy.services.common.authentication.JWTAuthenticator
import com.cryptocaddy.services.common.authentication.JWTBody
import com.cryptocaddy.xchange.data.exchanges.ExchangeController
import com.cryptocaddy.xchange.data.factory.AbstractExchangeFactory
import com.cryptocaddy.xchange.data.model.Coin
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.ArrayList


@RestController
@RequestMapping("/user-exchange")
//@RequestMapping("/")
class UserExchangeController(val userExchangeService: UserExchangeService) {

    @GetMapping(value = "/{id}", produces = arrayOf("application/json"))
    fun getUserExchange(@PathVariable("id") id: Long): UserExchange? =
            userExchangeService.userExchangeRepository.findOne(id)




    @PostMapping(value = "/add", produces = arrayOf("application/json"), consumes = arrayOf("application/json"))
    fun addUserExchange(@RequestHeader(value = "Authorization") authorization: String, @RequestBody requestAddExchange: RequestAddExchange): ResponseEntity<ResponseExchangeWrapper> {
        val jwtBody = JWTAuthenticator.getBodyFromToken(authorization)
        val response = userExchangeService.addUserExchange(jwtBody, requestAddExchange)
        //TODO: more error handling
        return ResponseEntity(response, HttpStatus.OK)
    }

    @PostMapping(value = "/remove", produces = arrayOf("application/json"))
    fun removeUserExchange(@RequestHeader(value="Authorization") authorization: String, @RequestParam exchangeIdRemove: Long): ResponseEntity<Result?> {

        val jwtBody = JWTAuthenticator.getBodyFromToken(authorization)
        val response = userExchangeService.removeUserExchange(jwtBody, exchangeIdRemove)
        //TODO: more error handling
        return ResponseEntity(response, HttpStatus.OK)
    }

    @GetMapping(value = "/wallets", produces = arrayOf("application/json"))
    fun getWallets(@RequestHeader(value="Authorization") authorization: String): ResponseEntity<ResponseUserData?> {

        val jwtBody = JWTAuthenticator.getBodyFromToken(authorization)
        val response = userExchangeService.getExchangeWallets(jwtBody)
        //TODO: more error handling
        return ResponseEntity(response, HttpStatus.OK)
    }

    @GetMapping(value = "/trades", produces = arrayOf("application/json"))
    fun getTrades(@RequestHeader(value="Authorization") authorization: String): ResponseEntity<ResponseUserData?> {

        val jwtBody = JWTAuthenticator.getBodyFromToken(authorization)
        val response = userExchangeService.getExchangeTrades(jwtBody)
        //TODO: more error handling
        return ResponseEntity(response, HttpStatus.OK)
    }

}