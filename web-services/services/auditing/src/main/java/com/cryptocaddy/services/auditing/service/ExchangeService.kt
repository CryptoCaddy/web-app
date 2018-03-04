package com.cryptocaddy.services.auditing.service

import com.cryptocaddy.services.auditing.model.response.ResponseSupportedExchanges
import com.cryptocaddy.xchange.data.exchanges.ExchangeType
import com.cryptocaddy.xchange.data.factory.AbstractExchangeFactory
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