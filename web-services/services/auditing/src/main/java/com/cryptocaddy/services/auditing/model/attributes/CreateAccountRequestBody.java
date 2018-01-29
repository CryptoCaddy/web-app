package com.cryptocaddy.services.auditing.model.attributes;

public class CreateAccountRequestBody {

    private String email;
    private String token;

    public CreateAccountRequestBody(String email, String token) {
        this.email = email;
        this.token = token;
    }

    public CreateAccountRequestBody() {
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
