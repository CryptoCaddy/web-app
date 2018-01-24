package com.cryptocaddy.fiat.client.service;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
public interface IFiatEngineService {

    BigDecimal convertValues(String exchange, String cryptoCurrency, String fiatCurrency, Date date);

}
