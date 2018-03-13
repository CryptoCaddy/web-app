package com.cryptocaddy.services.auditing.api.service

import com.cryptocaddy.services.auditing.api.dto.response.ResponseSupportedExchanges
import com.cryptocaddy.services.auditing.exchanges.controller.ExchangeType
import com.cryptocaddy.services.auditing.exchanges.factory.AbstractExchangeFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ExchangeService @Autowired
constructor(private val abstractExchangeFactory: AbstractExchangeFactory) {

    val supportedExchanges: ResponseSupportedExchanges
        get() {

            val responseSupportedExchanges = ResponseSupportedExchanges()
            for (exchange in ExchangeType.values()) {
                val controller = abstractExchangeFactory.getExchangeController(exchange)
                val exchangeName = exchange.name
                val exchangeParameters = controller!!.requiredParameters()
                responseSupportedExchanges.addSupportedExchange(exchangeName, exchangeParameters)
            }

            return responseSupportedExchanges

        }

}