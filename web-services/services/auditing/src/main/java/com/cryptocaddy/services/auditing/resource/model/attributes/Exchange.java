package com.cryptocaddy.services.auditing.resource.model.attributes;

public class Exchange {
    private String exchangeName;
    private String exchangeKey;
    private String exchangeSecret;
    private String exchangePass;

    public Exchange(String exchangeName, String exchangeKey, String exchangeSecret, String exchangePass) {
        this.exchangeName = exchangeName;
        this.exchangeKey = exchangeKey;
        this.exchangeSecret = exchangeSecret;
        this.exchangePass = exchangePass;
    }

    public Exchange() {
    }

    public String getExchangeName() {
        return exchangeName;
    }

    public void setExchangeName(String exchangeName) {
        this.exchangeName = exchangeName;
    }

    public String getExchangeKey() {
        return exchangeKey;
    }

    public void setExchangeKey(String exchangeKey) {
        this.exchangeKey = exchangeKey;
    }

    public String getExchangeSecret() {
        return exchangeSecret;
    }

    public void setExchangeSecret(String exchangeSecret) {
        this.exchangeSecret = exchangeSecret;
    }

    public String getExchangePass() {
        return exchangePass;
    }

    public void setExchangePass(String exchangePass) {
        this.exchangePass = exchangePass;
    }

}
