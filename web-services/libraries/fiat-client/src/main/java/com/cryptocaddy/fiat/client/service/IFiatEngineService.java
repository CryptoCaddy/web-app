package com.cryptocaddy.fiat.client.service;

import com.cryptocaddy.fiat.client.entity.FiatCoin;
import com.cryptocaddy.xchange.data.model.Coin;

import java.util.List;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
public interface IFiatEngineService {

    List<FiatCoin> convertValues(List<Coin> coins, String exchangeName);

}
