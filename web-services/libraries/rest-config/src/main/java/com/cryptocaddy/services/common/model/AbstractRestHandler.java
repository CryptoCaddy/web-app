package com.cryptocaddy.services.common.model;

import com.cryptocaddy.services.common.model.RestErrorInfo;
import com.cryptocaddy.services.common.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
public abstract class AbstractRestHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseBody
    public RestErrorInfo handleResourceNotFoundException(ResourceNotFoundException e) {
        System.out.println("Sorry - resource was not found: " + e.getMessage());
        return new RestErrorInfo(e, "Sorry - resource was not found: ");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseBody
    public RestErrorInfo handleIllegalArgumentException(IllegalArgumentException e) {
        System.out.println("Illegal argument exception: " + e.getMessage());
        return new RestErrorInfo(e, "Sorry - validation failed: ");
    }

}
