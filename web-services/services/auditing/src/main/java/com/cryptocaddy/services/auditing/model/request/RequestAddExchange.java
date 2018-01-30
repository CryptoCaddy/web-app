package com.cryptocaddy.services.auditing.model.request;

import com.cryptocaddy.services.auditing.model.attributes.Exchange;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@XmlRootElement
public class RequestAddExchange {

    private String exchangeName = new String();
    private Map<String, String> parameters;

    public RequestAddExchange(Map<String, String> parameters) {
        this.parameters = parameters;
    }

    public RequestAddExchange() {
        parameters = new HashMap<>();
    }

    public void setExchangeName(String exchangeName) {
        this.exchangeName = exchangeName;
    }

    public String getExchangeName() {
        return exchangeName;
    }

    public Map<String, String> getParameters() {
        return parameters;
    }

    public void setParameters(Map<String, String> parameters) {
        this.parameters = parameters;
    }
}
