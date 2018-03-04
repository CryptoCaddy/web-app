package com.cryptocaddy.services.auditing.service

import com.cryptocaddy.libraries.database.dao.UserExchange
import com.cryptocaddy.libraries.database.dao.UserExchangeRepository
import com.cryptocaddy.libraries.database.dao.UserRepository
import com.cryptocaddy.services.auditing.model.Result
import com.cryptocaddy.services.auditing.model.attributes.Exchange
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper
import com.cryptocaddy.services.auditing.model.response.ResponseUserData
import com.cryptocaddy.services.common.authentication.JWTBody
import com.cryptocaddy.xchange.data.exchanges.ExchangeController
import com.cryptocaddy.xchange.data.exchanges.ExchangeType
import com.cryptocaddy.xchange.data.factory.AbstractExchangeFactory
import com.cryptocaddy.xchange.data.model.TransactionHistory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.ArrayList
import java.util.HashMap
import javax.transaction.Transactional

@Service
class UserExchangeService @Autowired
constructor(val abstractExchangeFactory: AbstractExchangeFactory, val userRepository: UserRepository, val userExchangeRepository: UserExchangeRepository) {

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


    fun removeUserExchange(userJWTBody: JWTBody, exchangeIdRemove: Long?): Result? {

        val user = userRepository.findUserByUid(userJWTBody.uid)
        val ux = userExchangeRepository.findById(exchangeIdRemove)
        if (ux.user.uid !== user.uid) {
            //we have somehow ended up somewhere very bad. The requested exchange to be removed is not owned by this user.
            //TODO: handle this error properly
            return null
        }

        userExchangeRepository.removeById(exchangeIdRemove)
        return Result("Success")

    }


    fun getExchangeWallets(jwtBody: JWTBody): ResponseUserData {

        val user = userRepository.findUserByUid(jwtBody.uid)

        val exchanges = user.exchanges

        val response = ResponseUserData()

        for (userExchange in exchanges) {
            val controller = abstractExchangeFactory.getExchangeController(userExchange.name)

            val parameters = HashMap<String, String>()
            parameters.put(ExchangeController.API_KEY_PARAM, userExchange.apiKey)
            parameters.put(ExchangeController.API_SECRET_PARAM, userExchange.secret)

            if (userExchange.passphrase != null)
                parameters.put(ExchangeController.API_PASSPHRASE_PARAM, userExchange.passphrase)

            val coinList = if (controller != null) controller.getAllCoins(parameters) else ArrayList()

            val wrapper = ResponseExchangeWrapper(userExchange.name)
            wrapper.exchangeEntryId = userExchange.id!!
            wrapper.exchangeCoins = coinList

            response.addExchangeWrapper(wrapper)

        }

        return response
    }

    fun getExchangeTrades(jwtBody: JWTBody): ResponseUserData {

        val user = userRepository.findUserByUid(jwtBody.uid)

        val exchanges = user.exchanges

        val response = ResponseUserData()

        for (userExchange in exchanges) {
            val controller = abstractExchangeFactory.getExchangeController(userExchange.name)

            val parameters = HashMap<String, String>()
            parameters.put(ExchangeController.API_KEY_PARAM, userExchange.apiKey)
            parameters.put(ExchangeController.API_SECRET_PARAM, userExchange.secret)

            if (userExchange.passphrase != null)
                parameters.put(ExchangeController.API_PASSPHRASE_PARAM, userExchange.passphrase)

            val txHistory = if (controller != null) controller.getTransactionHistory(parameters) else null

            val wrapper = ResponseExchangeWrapper(userExchange.name)
            wrapper.exchangeEntryId = userExchange.id!!
            wrapper.txHistory = txHistory

            response.addExchangeWrapper(wrapper)

        }

        return response
    }

}