package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.services.auditing.resource.model.Result;
import com.cryptocaddy.services.auditing.resource.model.attributes.AddExchangesRequestBody;
import com.cryptocaddy.services.auditing.resource.model.attributes.Exchange;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddExchangesService {

    public Result addExchanges(AddExchangesRequestBody addExchangesRequestBody) {
        List<Exchange> exchangeList = addExchangesRequestBody.getExchangeList();
        String username = addExchangesRequestBody.getUsername();
        String password = addExchangesRequestBody.getPassword();

        // TODO: 1/13/2018 - Wire up to some core method that will add these exchanges to a user's account in db/cloud-storage

        return new Result("Success");
    }

}
