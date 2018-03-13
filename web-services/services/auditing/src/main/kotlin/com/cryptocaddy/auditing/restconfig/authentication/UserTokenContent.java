package com.cryptocaddy.services.auditing.restconfig.authentication;

import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;

public class UserTokenContent extends AbstractAuthenticationToken{

    private String uid;
    private String email;
    private String name;

    private Boolean emailVerified;

    public UserTokenContent(FirebaseToken decodedToken){
        super(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));

        uid = decodedToken.getUid();
        email = decodedToken.getEmail();
        name = decodedToken.getName();

        emailVerified = decodedToken.isEmailVerified();
    }

    @Override
    public Object getCredentials() {
        return email;
    }

    @Override
    public Object getPrincipal() {
        return uid;
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
