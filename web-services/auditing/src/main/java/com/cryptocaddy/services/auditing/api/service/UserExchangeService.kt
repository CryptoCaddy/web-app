package com.cryptocaddy.services.auditing.api.service

import com.cryptocaddy.services.auditing.database.entity.UserExchange
import com.cryptocaddy.services.auditing.database.repository.UserExchangeRepository
import com.cryptocaddy.services.auditing.database.repository.UserRepository
import com.cryptocaddy.services.auditing.api.dto.response.Result
import com.cryptocaddy.services.auditing.api.dto.request.RequestAddExchange
import com.cryptocaddy.services.auditing.api.dto.response.ResponseExchangeWrapper
import com.cryptocaddy.services.auditing.api.dto.response.ResponseUserData
import com.cryptocaddy.services.auditing.restconfig.authentication.UserTokenContent
import com.cryptocaddy.services.auditing.exchanges.controller.ExchangeController
import com.cryptocaddy.services.auditing.exchanges.factory.AbstractExchangeFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.ArrayList
import java.util.HashMap

@Service
class UserExchangeService @Autowired
constructor(val abstractExchangeFactory: AbstractExchangeFactory, val userRepository: UserRepository, val userExchangeRepository: UserExchangeRepository) {

    fun addUserExchange(userUserTokenContent: UserTokenContent, requestAddExchange: RequestAddExchange): ResponseExchangeWrapper? {

        val user = userRepository.findUserByUid(userUserTokenContent.uid)

        val controller = abstractExchangeFactory.getExchangeController(requestAddExchange.exchangeName)
        val coinList = if (controller != null) controller.getAllCoins(requestAddExchange.parameters) else ArrayList()

        val pList = requestAddExchange.parameters
        if (pList != null){
            val key : String? = pList[ExchangeController.API_KEY_PARAM]  //?: throw IllegalArgumentException("api key parameter expected")
            val secret : String? = pList[ExchangeController.API_SECRET_PARAM]
            val nullablePass :String? = pList[ExchangeController.API_PASSPHRASE_PARAM]

            if (key == null || secret == null){
                throw IllegalArgumentException("key and secret must not be null")
            }

            val userExchange = UserExchange(requestAddExchange.exchangeName, key, secret, nullablePass)
            userExchange.user = user
            userExchangeRepository.save(userExchange)

            val wrapper = ResponseExchangeWrapper(requestAddExchange.exchangeName)
            wrapper.exchangeEntryId = userExchange.id ?: return null
            wrapper.exchangeCoins = coinList
            return wrapper
        }

        return null

    }


    fun removeUserExchange(userUserTokenContent: UserTokenContent, exchangeIdRemove: Long?): Result? {

        val user = userRepository.findUserByUid(userUserTokenContent.uid)
        val ux = userExchangeRepository.findById(exchangeIdRemove)
        if (ux.user?.uid !== user.uid) {
            //we have somehow ended up somewhere very bad. The requested exchange to be removed is not owned by this user.
            throw IllegalArgumentException("Requested exchange to be removed is not owned by this user")
        }

        userExchangeRepository.removeById(exchangeIdRemove)
        return Result("Success")

    }


    fun getExchangeWallets(userTokenContent: UserTokenContent): ResponseUserData? {

        val user = userRepository.findUserByUid(userTokenContent.uid)

        val exchanges = user.getExchanges()

        val response = ResponseUserData()

        if (exchanges == null){
            //TODO: this probably shouldn't be handled so quietly.
            return null
        }

        for (userExchange in exchanges) {
            val controller = abstractExchangeFactory.getExchangeController(userExchange.name)

            val parameters = HashMap<String, String?>()
            parameters[ExchangeController.API_KEY_PARAM] = userExchange.apiKey
            parameters[ExchangeController.API_SECRET_PARAM] = userExchange.secret

            if (userExchange.passphrase != null)
                parameters[ExchangeController.API_PASSPHRASE_PARAM] = userExchange.passphrase

            val coinList = if (controller != null) controller.getAllCoins(parameters) else ArrayList()

            val wrapper = ResponseExchangeWrapper(userExchange.name)
            wrapper.exchangeEntryId = userExchange.id!!
            wrapper.exchangeCoins = coinList

            response.addExchangeWrapper(wrapper)

        }

        return response
    }

    fun getExchangeTrades(userTokenContent: UserTokenContent): ResponseUserData? {

        val user = userRepository.findUserByUid(userTokenContent.uid)

        val exchanges = user.getExchanges()

        val response = ResponseUserData()

        if (exchanges == null){
            return null
        }

        for (userExchange in exchanges) {
            val controller = abstractExchangeFactory.getExchangeController(userExchange.name)

            val parameters = HashMap<String, String?>()
            parameters[ExchangeController.API_KEY_PARAM] = userExchange.apiKey
            parameters[ExchangeController.API_SECRET_PARAM] = userExchange.secret

            if (userExchange.passphrase != null)
                parameters[ExchangeController.API_PASSPHRASE_PARAM] = userExchange.passphrase

            val txHistory = if (controller != null) controller.getTransactionHistory(parameters) else null

            val wrapper = ResponseExchangeWrapper(userExchange.name)
            wrapper.exchangeEntryId = userExchange.id!!
            wrapper.txHistory = txHistory

            response.addExchangeWrapper(wrapper)

        }

        return response
    }

}