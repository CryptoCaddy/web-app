package com.cryptocaddy.services.auditing.api;

import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestCreateAccount;
import com.cryptocaddy.services.common.model.RestErrorInfo;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@Api(value = "createAccount", description = "Create new user account API")
public interface CreateAccountApi {

    @ApiOperation(value = "Create Account", notes = "The Create Account API creates a new user account and returns success/failure", response = Result.class, tags = {"Create Account"})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Create Account Response", response = Result.class),
            @ApiResponse(code = 400, message = "Unexpected Error", response = RestErrorInfo.class)
    })
    @SuppressWarnings("all")

    @RequestMapping(value = "/createAccount",
            produces = { "application/json" },
            method = RequestMethod.POST)
    ResponseEntity<Result> createAccountPost(@RequestBody RequestCreateAccount requestCreateAccount);


}