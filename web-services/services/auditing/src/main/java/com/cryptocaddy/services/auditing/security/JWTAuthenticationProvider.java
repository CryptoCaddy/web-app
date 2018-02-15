package com.cryptocaddy.services.auditing.security;

import com.cryptocaddy.services.auditing.db.entity.User;
import com.cryptocaddy.services.auditing.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class JWTAuthenticationProvider implements AuthenticationProvider {
    private UserRepository userRepository;

    @Autowired
    public JWTAuthenticationProvider(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        //only process JWT authentications
        if(authentication instanceof JWTAuthentication) {
            JWTAuthentication jwtAuthentication = (JWTAuthentication) authentication;

            //get the user id
            String uid = jwtAuthentication.getPrincipal().toString();
            if (uid == null){
                return null;

            }
            jwtAuthentication.setAuthenticated(true);

            //try to find the user id in the databse
            User u = userRepository.findByUsername(uid);

            //if we find the user authenticate this request
            if(u != null) {
                jwtAuthentication.setUser(u);
                //jwtAuthentication.setAuthenticated(true);

            }
            return jwtAuthentication;
        }
        return null;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass == JWTAuthentication.class;
    }
}
