package com.cryptocaddy.services.auditing.client.wrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@Component
public class RestTemplateWrapper<S, T> {
    @Autowired
    private RestTemplate restTemplate;

    public T exchange(String url, HttpMethod httpMethod, HttpEntity<S> entity, Class<T> clazz) {
        ResponseEntity<T> responseEntity = restTemplate.exchange(url, httpMethod, entity, clazz);
        return responseEntity.getBody();
    }
}
