package com.cryptocaddy.xchange.data.exchanges;

import org.knowm.xchange.bittrex.BittrexExchange;
import org.springframework.stereotype.Component;

import java.util.HashMap;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
@Component
public class BittrexController extends ExchangeController {

    protected String getWrappedXchangeName(){
        return BittrexExchange.class.getName();
    }


}
