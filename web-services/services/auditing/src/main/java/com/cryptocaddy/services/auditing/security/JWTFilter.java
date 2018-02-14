package com.cryptocaddy.services.auditing.security;

import com.google.firebase.auth.FirebaseAuth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTFilter extends OncePerRequestFilter {

    private static Logger logger = LoggerFactory.getLogger(JWTFilter.class.getName());

    private AuthenticationManager authenticationManager;

    public JWTFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws IOException, ServletException {
        String header = httpServletRequest.getHeader("Authorization");



        //process this request if there's a bearer token
        if (header != null && header.startsWith("Bearer ")) {
            //retrieve the token
            String authToken = header.substring(7);

            try {
                //verify it through firebase
                JWTAuthentication jwtAuthentication = getJWTAuthenticationFromToken(authToken);
                //authenticate it through our auth manager (which runs it through JWTAuthenticationProvider)
                Authentication authentication = authenticationManager.authenticate(jwtAuthentication);
                //save it as the current user
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                logger.error("JWT token auth failed", e);
            }
        } else {
            logger.warn("No JWT token found in request headers");
        }

        //continue processing this request
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    public static JWTAuthentication getJWTAuthenticationFromToken(String token) throws Exception {
        return new JWTAuthentication(FirebaseAuth.getInstance().verifyIdTokenAsync(token).get());
    }
}
