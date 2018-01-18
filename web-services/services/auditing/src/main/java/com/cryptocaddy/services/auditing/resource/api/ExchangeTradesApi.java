package com.cryptocaddy.services.auditing.resource.api;

import com.cryptocaddy.core.model.TransactionHistory;
import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.attributes.Exchange;
import com.cryptocaddy.services.common.model.RestErrorInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Jon Waggoner
 * Date: 1/18/2018
 */
@Api(value = "exchangeTrades", description = "Retrieve trades from an exchange")
public interface ExchangeTradesApi {

    @ApiOperation(value = "Exchange Trades", notes = "The Exchange Trades API gets all trades for a user on the specified exchange with given an api key and secret", response = TransactionHistory.class, tags = {"Exchange Trades"})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Exchange Trades Response", response = TransactionHistory.class),
            @ApiResponse(code = 400, message = "Unexpected Error", response = RestErrorInfo.class)
    })
    @SuppressWarnings("all")
    @RequestMapping(value = "/exchangeTrades",
            produces = { "application/json" },
            method = RequestMethod.GET)
    ResponseEntity<TransactionHistory> getExchangeTrades(@RequestBody Exchange exchange);

}