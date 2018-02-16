package com.cryptocaddy.services.auditing.security;

import com.cryptocaddy.services.auditing.db.entity.User;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;

public class JWTAuthentication extends AbstractAuthenticationToken {

    private final String uid;
    private final String email;
    private final String name;

    private User user;

    public JWTAuthentication(FirebaseToken decodedToken){
        super(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        uid = decodedToken.getUid();
        email = decodedToken.getEmail();
        name = "none"; //decodedToken.getName();
        
        //TODO: unsure if this should be left null til filled or not. Doing this cuz spring isn't liking a null user.
        user = new User();
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Object getCredentials() {
        return email;
    }

    @Override
    public Object getPrincipal() {
        return uid;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
