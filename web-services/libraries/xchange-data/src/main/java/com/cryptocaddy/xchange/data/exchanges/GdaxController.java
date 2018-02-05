package com.cryptocaddy.xchange.data.exchanges;

import com.cryptocaddy.xchange.data.model.ParameterList;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;
import org.knowm.xchange.gdax.GDAXExchange;
import org.springframework.stereotype.Component;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
@Component
public class GdaxController extends ExchangeController {

    public static final String API_PASSPHRASE_PARAM = "passphrase";

    protected String getWrappedXchangeName(){
        return GDAXExchange.class.getName();
    }

    /**
     * Additional parameters on top of key and secret that are required to get user exchange data.
     * GDAX requires a password.
     * @return list of names of required parameters other than key and secret
     */
    @Override
    public ParameterList requiredParameters(){
        ParameterList parameters = super.requiredParameters();
        parameters.add(API_PASSPHRASE_PARAM, JsonFormatTypes.STRING);
        return parameters;
    }






}
