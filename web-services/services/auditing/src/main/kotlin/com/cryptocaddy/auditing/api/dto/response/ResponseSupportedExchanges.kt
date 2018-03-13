package com.cryptocaddy.services.auditing.api.dto.response

import com.cryptocaddy.services.auditing.model.ParameterList

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
