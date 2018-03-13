package com.cryptocaddy.services.auditing.restconfig.model;

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

    @SuppressWarnings("unused")
    public String getDetail() {
        return detail;
    }

    @SuppressWarnings("unused")
    public String getMessage() {
        return message;
    }
}
