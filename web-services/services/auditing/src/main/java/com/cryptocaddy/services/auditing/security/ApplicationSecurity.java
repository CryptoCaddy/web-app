package com.cryptocaddy.services.auditing.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {

    private JWTAuthenticationProvider jwtAuthenticationProvider;

    @Autowired
    public ApplicationSecurity(JWTAuthenticationProvider jwtAuthenticationProvider) {
        this.jwtAuthenticationProvider = jwtAuthenticationProvider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()//no default csrf
                .authorizeRequests()
                    //by default all endpoints requires authentication
                    .requestMatchers(new NegatedRequestMatcher(swaggerRequestMatcher()))
                        .authenticated()
                    //swagger is allowed anonymous access
                    .requestMatchers(swaggerRequestMatcher())
                        .anonymous()
                    .and()
                //jwt token filter
                .addFilterBefore(new JWTFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class)
                //stateless
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                //disable default security
                .httpBasic()
                    .disable()
                .formLogin()
                    .disable();
    }

    private RequestMatcher swaggerRequestMatcher() {
        //returns a matcher for all the resource swagger needs
        return new OrRequestMatcher(new AntPathRequestMatcher("/"),
                new AntPathRequestMatcher("/api/createAccount/"),
                new AntPathRequestMatcher("/swagger-ui.html"),
                new AntPathRequestMatcher("/swagger-resources/**"),
                new AntPathRequestMatcher("/webjars/**"),
                new AntPathRequestMatcher("/api-docs/**"));

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

}
