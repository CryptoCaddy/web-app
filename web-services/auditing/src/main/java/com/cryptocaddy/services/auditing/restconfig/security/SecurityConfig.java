

package com.cryptocaddy.services.auditing.restconfig.security;

import com.cryptocaddy.services.auditing.restconfig.authentication.UserAuthenticationFilter;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/")
                .antMatchers("/api/")
                .antMatchers("/swagger-resources/**")
                .antMatchers("/webjars/springfox-swagger-ui/**")
                .antMatchers("/swagger-ui.html")
                .antMatchers("/api-docs**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .addFilter(new UserAuthenticationFilter(authenticationManager()));
    }
}