package com.cryptocaddy.services.auditing.dto.response

import com.cryptocaddy.xchange.data.model.ParameterList

import java.util.*

class ResponseSupportedExchanges {

    private val exchangeToParameterMap: MutableMap<String, ParameterList>

    init {
        exchangeToParameterMap = HashMap()
    }

    fun getExchangeToParameterMap(): Map<String, ParameterList> {
        return exchangeToParameterMap
    }

    fun addSupportedExchange(exchangeName: String, requiredParameters: ParameterList) {
        exchangeToParameterMap.put(exchangeName, requiredParameters)
    }

}
