package com.cryptocaddy.services.auditing.api;

import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchanges;
import com.cryptocaddy.services.common.model.RestErrorInfo;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@Api(value = "addExchanges", description = "Add Exchanges API")
public interface AddExchangesApi {

    @ApiOperation(value = "Add Exchanges", notes = "The Add Exchanges API adds exchange APIs to a user account", response = Result.class, tags = {"Add Exchanges"})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Add Exchanges Response", response = Result.class),
            @ApiResponse(code = 400, message = "Unexpected Error", response = RestErrorInfo.class)
    })
    @SuppressWarnings("all")
    @RequestMapping(value = "/addExchanges",
            produces = { "application/json" },
            method = RequestMethod.POST)
    ResponseEntity<Result> addExchanges(@RequestBody RequestAddExchanges requestAddExchanges);

}