package com.cryptocaddy.services.common.authentication;

import com.cryptocaddy.services.common.exception.UserAuthenticationException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

public class JWTAuthenticator {

    public static Boolean isAuthorized(String token){
        try{
            FirebaseAuth.getInstance().verifyIdTokenAsync(token).get();
            return true;
        }catch (Exception e){
            throw new UserAuthenticationException(String.format("JWT failed verification: %s", e.getMessage()));
        }

    }

    public static JWTBody getBodyFromToken(String token){

        JWTBody body = null;

        try{
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdTokenAsync(token).get();
            body = new JWTBody(decodedToken);
        }catch (Exception e){
            throw new UserAuthenticationException(String.format("JWT failed verification: %s", e.getMessage()));
        }

        return body;

    }


}
