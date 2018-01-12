package com.cryptocaddy.core.exchanges;

import java.math.BigDecimal;

/**
 * Created by Jon Waggoner
 * Date: 1/11/2018
 */
public class Coin {

    public String symbol;
    public BigDecimal quantity;

    public Coin(String symbol, BigDecimal quantity){
        this.symbol = symbol;
        this.quantity = quantity;
    }

}
