package com.cryptocaddy.services.common.model;

/**
 * Created by: Nick Fields
 * Date: 1/8/2018
 */
public class RestErrorInfo {
    private final String detail;
    private final String message;

    public RestErrorInfo(Exception e, String detail) {
        this.detail = detail;
        this.message = e.getLocalizedMessage();
    }

}
