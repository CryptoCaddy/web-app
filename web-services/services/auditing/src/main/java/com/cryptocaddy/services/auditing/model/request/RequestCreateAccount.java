package com.cryptocaddy.services.auditing.model.request;

public class RequestCreateAccount {

    private String email;
    private String token;

    public RequestCreateAccount(String email, String token) {
        this.email = email;
        this.token = token;
    }

    public RequestCreateAccount() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
