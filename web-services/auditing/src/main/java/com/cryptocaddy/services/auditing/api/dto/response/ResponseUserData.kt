package com.cryptocaddy.services.auditing.api.dto.response

import java.util.ArrayList

class ResponseUserData {

    private var allExchangeWrappers: MutableList<ResponseExchangeWrapper>? = null

    init {
        allExchangeWrappers = ArrayList()
    }

    fun getAllExchangeWrappers(): List<ResponseExchangeWrapper>? {
        return allExchangeWrappers
    }

    fun setAllExchangeWrappers(allExchangeWrappers: MutableList<ResponseExchangeWrapper>) {
        this.allExchangeWrappers = allExchangeWrappers
    }

    fun addExchangeWrapper(responseExchangeWrapper: ResponseExchangeWrapper) {
        allExchangeWrappers!!.add(responseExchangeWrapper)
    }
}
