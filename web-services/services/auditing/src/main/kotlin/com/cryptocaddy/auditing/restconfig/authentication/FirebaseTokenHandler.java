package com.cryptocaddy.services.auditing.restconfig.authentication;

import com.cryptocaddy.services.auditing.restconfig.exception.UserAuthenticationException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

import static com.cryptocaddy.services.auditing.restconfig.security.SecurityConstants.TOKEN_PREFIX;

public class FirebaseTokenHandler {

    public static Boolean isAuthorized(String token){
        try{
            FirebaseAuth.getInstance().verifyIdTokenAsync(token).get();
            return true;
        }catch (Exception e){
            throw new UserAuthenticationException(String.format("JWT failed verification: %s", e.getMessage()));
        }

    }

    public static UserTokenContent getBodyFromToken(String token){

        UserTokenContent body = null;

        token = token.replace(TOKEN_PREFIX, "");
        try{
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdTokenAsync(token).get();
            body = new UserTokenContent(decodedToken);
        }catch (Exception e){
            throw new UserAuthenticationException(String.format("JWT failed verification: %s", e.getMessage()));
        }

        return body;

    }


}
