package com.cryptocaddy.services.auditing.api;

import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange;
import com.cryptocaddy.services.auditing.model.response.ExchangeWrapperResponse;
import com.cryptocaddy.services.common.model.RestErrorInfo;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@Api(value = "addExchange", description = "Add Exchanges API")
public interface AddExchangeApi {

    @ApiOperation(value = "Add Exchange", notes = "The Add Exchange API adds exchange APIs to a user account", response = Result.class, tags = {"Add Exchange"})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Add Exchange Response", response = Result.class),
            @ApiResponse(code = 400, message = "Unexpected Error", response = RestErrorInfo.class)
    })
    @SuppressWarnings("all")
    @RequestMapping(value = "/addExchange",
            produces = { "application/json" },
            method = RequestMethod.POST)
    ResponseEntity<ExchangeWrapperResponse> addExchange(@RequestHeader(value="Authorization") String authorization, @RequestBody RequestAddExchange requestAddExchange);


}