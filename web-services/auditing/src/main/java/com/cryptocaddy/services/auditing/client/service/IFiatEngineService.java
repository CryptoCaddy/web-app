package com.cryptocaddy.services.auditing.client.service;

import com.cryptocaddy.services.auditing.client.entity.FiatCoin;
import com.cryptocaddy.services.auditing.model.Coin;

import java.util.List;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
public interface IFiatEngineService {

    List<FiatCoin> convertValues(List<Coin> coins, String exchangeName);

}
