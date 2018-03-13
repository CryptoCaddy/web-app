package com.cryptocaddy.services.auditing.restconfig.authentication;

import com.cryptocaddy.services.auditing.restconfig.authentication.UserTokenContent;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.cryptocaddy.services.auditing.restconfig.security.SecurityConstants.HEADER_STRING;
import static com.cryptocaddy.services.auditing.restconfig.security.SecurityConstants.TOKEN_PREFIX;

public class UserAuthenticationFilter extends BasicAuthenticationFilter {

    public UserAuthenticationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING);

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        AbstractAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private AbstractAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            try{
                token = token.replace(TOKEN_PREFIX, "");
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdTokenAsync(token).get();
                UserTokenContent authToken = new UserTokenContent(decodedToken);
                authToken.setAuthenticated(true);
                return authToken;
            }catch (Exception e){
                System.out.println("failed auth");
            }
            return null;
        }
        return null;
    }


}
