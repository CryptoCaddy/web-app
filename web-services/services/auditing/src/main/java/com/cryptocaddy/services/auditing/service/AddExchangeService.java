package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.services.auditing.model.Result;
import com.cryptocaddy.services.auditing.model.request.RequestAddExchange;
import com.cryptocaddy.services.auditing.model.attributes.Exchange;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddExchangeService {

    public Result addExchange(RequestAddExchange requestAddExchange) {

        // TODO: 1/13/2018 - Wire up to some core method that will add these exchanges to a user's account in db/cloud-storage

        return new Result("Success");
    }

}
