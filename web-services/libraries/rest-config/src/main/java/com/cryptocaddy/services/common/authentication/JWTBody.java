package com.cryptocaddy.services.common.authentication;

import com.google.firebase.auth.FirebaseToken;

public class JWTBody {

    private String uid;
    private String email;
    private String name;

    private Boolean emailVerified;

    public JWTBody() {}

    public JWTBody(FirebaseToken decodedToken){
        uid = decodedToken.getUid();
        email = decodedToken.getEmail();
        name = decodedToken.getName();

        emailVerified = decodedToken.isEmailVerified();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }
}
