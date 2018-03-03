package com.cryptocaddy.services.auditing.api

import com.cryptocaddy.libraries.database.dao.User
import com.cryptocaddy.libraries.database.dao.UserRepository
import com.cryptocaddy.services.auditing.model.Result
import com.cryptocaddy.services.auditing.model.request.RequestCreateAccount
import com.cryptocaddy.services.auditing.model.response.ResponseSupportedExchanges
import com.cryptocaddy.services.auditing.service.SupportedExchangesService
import com.cryptocaddy.services.common.authentication.JWTAuthenticator
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/supportedExchanges")
class ExchangeController(val supportedExchangesService: SupportedExchangesService) {

    @GetMapping(produces = arrayOf("application/json"))
    fun getSupportedExchanges(): ResponseEntity<ResponseSupportedExchanges> {

        val result = supportedExchangesService.supportedExchanges

        return ResponseEntity(result, HttpStatus.OK)
    }

}