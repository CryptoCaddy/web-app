package com.cryptocaddy.services.auditing.api

import com.cryptocaddy.libraries.database.dao.User
import com.cryptocaddy.libraries.database.dao.UserExchange
import com.cryptocaddy.libraries.database.dao.UserExchangeRepository
import com.cryptocaddy.libraries.database.dao.UserRepository
import com.cryptocaddy.services.auditing.model.Result
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange
import com.cryptocaddy.services.auditing.model.request.RequestCreateAccount
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper
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
class UserExchangeController(val userRepository: UserRepository,
                             val userExchangeRepository: UserExchangeRepository,
                             val abstractExchangeFactory: AbstractExchangeFactory) {

    @GetMapping(value = "/{id}", produces = arrayOf("application/json"))
    fun getUserExchange(@PathVariable("id") id: Long): UserExchange? =
            userExchangeRepository.findOne(id)

    /*
    @GetMapping(value = "/removeExchange/{id}", produces = arrayOf("application/json"))
    fun removeUserExchange(@PathVariable("id") id: String): Result? {

        return null
    }
    */


    @PostMapping(value = "/remove", produces = arrayOf("application/json"))
    fun removeUserExchange(@RequestHeader(value="Authorization") authorization: String, @RequestParam id: Long): Result? {

        return null
    }



    @PostMapping(value = "/add", produces = arrayOf("application/json"), consumes = arrayOf("application/json"))
    fun addUserExchange(@RequestHeader(value = "Authorization") authorization: String, @RequestBody requestAddExchange: RequestAddExchange): ResponseEntity<ResponseExchangeWrapper> {

        val jwtBody = JWTAuthenticator.getBodyFromToken(authorization)
        val user = userRepository.findUserByUid(jwtBody.uid)

        val controller = abstractExchangeFactory.getExchangeController(requestAddExchange.exchangeName)
        val coinList = if (controller != null) controller.getAllCoins(requestAddExchange.parameters) else ArrayList<Coin>()

        val pList = requestAddExchange.parameters
        val key = pList[ExchangeController.API_KEY_PARAM] as String
        val secret = pList[ExchangeController.API_SECRET_PARAM] as String
        val nullablePass = pList[ExchangeController.API_PASSPHRASE_PARAM]


        val userExchange = UserExchange(requestAddExchange.exchangeName, key, secret, nullablePass)
        userExchange.user = user
        userExchangeRepository.save(userExchange)

        val wrapper = ResponseExchangeWrapper(requestAddExchange.exchangeName)
        wrapper.exchangeEntryId = userExchange.id
        wrapper.exchangeCoins = coinList
        return ResponseEntity(wrapper, HttpStatus.OK)


    }

}