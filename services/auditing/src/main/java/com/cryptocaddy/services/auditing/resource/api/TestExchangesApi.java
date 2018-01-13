package com.cryptocaddy.services.auditing.resource.api;

import com.cryptocaddy.core.exchanges.Coin;
import com.cryptocaddy.services.auditing.resource.model.Result;
import com.cryptocaddy.services.auditing.resource.model.attributes.AddExchangesRequestBody;
import com.cryptocaddy.services.common.model.RestErrorInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.knowm.xchange.dto.trade.UserTrade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Created by Jon Waggoner
 * Date: 1/12/2018
 */
@Api(value = "testExchanges", description = "Test Exchanges API")
public interface TestExchangesApi {

    @ApiOperation(value = "Test Exchanges", notes = "The Test Exchanges API uses hard coded keys/secrets in config-local.yml to test exchange responses", response = Result.class, tags = {"Test Exchanges"})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Test Exchanges Response", response = Result.class),
            @ApiResponse(code = 400, message = "Unexpected Error", response = RestErrorInfo.class)
    })
    @SuppressWarnings("all")
    @RequestMapping(value = "/testExchangeWallets",
            produces = { "application/json" },
            method = RequestMethod.GET)
    ResponseEntity<List<Coin>> testExchangeWallets();

    @RequestMapping(value = "/testExchangeTrades",
            produces = { "application/json" },
            method = RequestMethod.GET)
    ResponseEntity<List<UserTrade>> testExchangeTrades();

}