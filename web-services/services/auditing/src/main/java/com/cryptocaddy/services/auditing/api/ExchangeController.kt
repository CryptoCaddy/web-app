package com.cryptocaddy.services.auditing.api

import com.cryptocaddy.services.auditing.dto.response.ResponseSupportedExchanges
import com.cryptocaddy.services.auditing.service.ExchangeService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/exchanges")
class ExchangeController(val exchangeService: ExchangeService) {

    @GetMapping(value = ["/supported"], produces = ["application/json"])
    fun getSupportedExchanges(): ResponseEntity<ResponseSupportedExchanges> {
        val result = exchangeService.supportedExchanges
        //TODO: more error handling
        return ResponseEntity(result, HttpStatus.OK)
    }

}