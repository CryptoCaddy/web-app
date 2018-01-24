package com.cryptocaddy.services.auditing.model.attributes;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement
public class AddExchangesRequestBody {
    private String username;
    private String password;
    private List<Exchange> exchangeList = new ArrayList<>();

    public AddExchangesRequestBody(String username, String password, List<Exchange> exchangeList) {
        this.username = username;
        this.password = password;
        this.exchangeList = exchangeList;
    }

    public AddExchangesRequestBody() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Exchange> getExchangeList() {
        return exchangeList;
    }

    public void setExchangeList(List<Exchange> exchangeList) {
        this.exchangeList = exchangeList;
    }

}
