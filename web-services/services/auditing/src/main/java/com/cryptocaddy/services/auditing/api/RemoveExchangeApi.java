package com.cryptocaddy.services.auditing.api;

import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange;
import com.cryptocaddy.services.auditing.model.response.ResponseExchangeWrapper;
import com.cryptocaddy.services.common.model.RestErrorInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "removeExchange", description = "Remove Exchanges API")
public interface RemoveExchangeApi {

    @ApiOperation(value = "Remove Exchange", notes = "The Remove Exchange API removes an exchange API key/secret pair from a user account", response = Result.class, tags = {"Remove Exchange"})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Create Account Response", response = Result.class),
            @ApiResponse(code = 400, message = "Unexpected Error", response = RestErrorInfo.class)
    })

    @SuppressWarnings("all")
    @RequestMapping(value = "/removeExchange",
            produces = { "application/json" },
            method = RequestMethod.POST)
    ResponseEntity<Result> removeExchange(@RequestHeader(value="Authorization") String authorization, @RequestParam long exchangeIdRemove);


}