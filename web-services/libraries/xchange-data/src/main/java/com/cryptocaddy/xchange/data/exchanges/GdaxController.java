package com.cryptocaddy.xchange.data.exchanges;

import com.cryptocaddy.xchange.data.model.ParameterList;
import org.knowm.xchange.gdax.GDAXExchange;
import org.springframework.stereotype.Component;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
@Component
public class GdaxController extends ExchangeController {

    protected String getWrappedXchangeName(){
        return GDAXExchange.class.getName();
    }

    /**
     * Additional parameters on top of key and secret that are required to get user exchange data.
     * GDAX requires a password.
     * @return list of names of required parameters other than key and secret
     */
    @Override
    public ParameterList<String, String> requiredAdditionalParameters(){
        ParameterList<String, String> parameters = super.requiredAdditionalParameters();
        parameters.add("passphrase", "The password associated with the api key and secret.");
        return parameters;
    }






}
