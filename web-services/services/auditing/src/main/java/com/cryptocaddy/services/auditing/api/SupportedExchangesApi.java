package com.cryptocaddy.services.auditing.api;

import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.common.model.RestErrorInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Jon Waggoner
 * Date: 1/18/2018
 */
@Api(value = "supportedExchanges", description = "Retrieve a list of exchanges with api functionality supported by CryptoCaddy")
public interface SupportedExchangesApi {

    @ApiOperation(value = "Supported Exchanges", notes = "The Supported Exchanges API gets the names of all exchanges whose apis can be leveraged by CryptoCaddy", response = Result.class, tags = {"Supported Exchanges"})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Supported Exchanges Response", response = Result.class),
            @ApiResponse(code = 400, message = "Unexpected Error", response = RestErrorInfo.class)
    })
    @SuppressWarnings("all")
    @RequestMapping(value = "/supportedExchanges",
            produces = { "application/json" },
            method = RequestMethod.GET)
    ResponseEntity<Result> getSupportedExchanges();

}