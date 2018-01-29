package com.cryptocaddy.xchange.data.model;

import java.util.*;

/**
 * Simple wrapper to encapsulate behavior among a list of parameters
 */
public class ParameterList<L, R> {

    private List<Parameter<L, R>> parameterList;

    public ParameterList(){
        parameterList = new ArrayList<>();
    }

    public List<Parameter<L, R>> getParameterList() {
        return parameterList;
    }

    public void addParameter(Parameter<L, R> parameter){
        parameterList.add(parameter);
    }

    public void add(L left, R right){
        Parameter<L, R> parameter = new Parameter<>(left, right);
        parameterList.add(parameter);
    }

    public int size(){
        return parameterList.size();
    }
}
