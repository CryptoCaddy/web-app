package com.cryptocaddy.services.auditing.api.dto.response

import java.util.ArrayList

class Result(val status: String) {
    private val results: MutableList<String>

    init {
        results = ArrayList()
    }

    fun getResults(): List<String> {
        return results
    }

    fun addResult(resultToAdd: String) {
        results.add(resultToAdd)
    }

}
