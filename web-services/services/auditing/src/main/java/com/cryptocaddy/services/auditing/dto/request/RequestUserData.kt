package com.cryptocaddy.services.auditing.dto.request

class RequestUserData {

    var requestExchangeWallets: Boolean = false
    var limitExchangeWallets: List<String>? = null

    var requestExchangeTrades: Boolean = false
    var limitExchangeTrades: List<String>? = null

}
