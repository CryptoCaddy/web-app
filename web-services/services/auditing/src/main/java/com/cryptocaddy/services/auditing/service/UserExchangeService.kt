package com.cryptocaddy.services.auditing.service

import com.cryptocaddy.libraries.database.dao.UserExchange
import com.cryptocaddy.libraries.database.dao.UserExchangeRepository
import com.cryptocaddy.libraries.database.dao.UserRepository
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper
import com.cryptocaddy.services.common.authentication.JWTBody
import com.cryptocaddy.xchange.data.exchanges.ExchangeController
import com.cryptocaddy.xchange.data.factory.AbstractExchangeFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.ArrayList

@Service
class UserExchangeService @Autowired
constructor(private val abstractExchangeFactory: AbstractExchangeFactory, private val userRepository: UserRepository, private val userExchangeRepository: UserExchangeRepository) {

    fun addUserExchange(userJWTBody: JWTBody, requestAddExchange: RequestAddExchange): ResponseExchangeWrapper {

        val user = userRepository.findUserByUid(userJWTBody.uid)

        val controller = abstractExchangeFactory.getExchangeController(requestAddExchange.exchangeName)
        val coinList = if (controller != null) controller.getAllCoins(requestAddExchange.parameters) else ArrayList()

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
        return wrapper


    }

}