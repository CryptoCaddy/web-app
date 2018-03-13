package com.cryptocaddy.services.auditing.api.dto.response

import com.cryptocaddy.services.auditing.exchanges.controller.ExchangeType
import com.cryptocaddy.services.auditing.model.Coin
import com.cryptocaddy.services.auditing.model.TransactionHistory

class ResponseExchangeWrapper {

    //this is not the id of the exchange itself. this is the id of the entry in the user_exchange table.
    var exchangeEntryId: Long = 0

    var exchangeName: String? = null
    var txHistory: TransactionHistory? = null
    var exchangeCoins: List<Coin>? = null

    constructor(exchangeType: ExchangeType) {
        exchangeName = exchangeType.name
    }

    constructor(exchangeName: String?) {
        this.exchangeName = exchangeName
    }
}
