package com.cryptocaddy.services.auditing.model;

import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;

import java.util.*;

/**
 * Simple wrapper to encapsulate behavior among a list of parameters
 */
public class ParameterList {

    private List<Parameter> parameterList;

    public ParameterList(){
        parameterList = new ArrayList<>();
    }

    public List<Parameter> getParameterList() {
        return parameterList;
    }

    public void addParameter(Parameter parameter){
        parameterList.add(parameter);
    }

    public void add(String name, JsonFormatTypes type){
        Parameter parameter = new Parameter(name, type);
        parameterList.add(parameter);
    }

    public int size(){
        return parameterList.size();
    }
}
