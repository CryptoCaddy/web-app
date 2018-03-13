package com.cryptocaddy.services.auditing.model;


/*public class Parameter<L,R> {

    private final L parameter;
    private final R type;

    public Parameter(L parameter, R type) {
        this.parameter = parameter;
        this.type = type;
    }

    public L getParameter() { return parameter; }
    public R getType() { return type; }

    @Override
    public int hashCode() { return parameter.hashCode() ^ type.hashCode(); }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Parameter)) return false;
        Parameter pairo = (Parameter) o;
        return this.parameter.equals(pairo.getParameter()) &&
                this.type.equals(pairo.getType());
    }

}*/

import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;

public class Parameter {

    private final String parameter;
    private final JsonFormatTypes type;

    public Parameter(String parameter, JsonFormatTypes type) {
        this.parameter = parameter;
        this.type = type;
    }

    public Object getParameter() { return parameter; }
    public Object getType() { return type; }

    @Override
    public int hashCode() { return parameter.hashCode() ^ type.hashCode(); }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Parameter)) return false;
        Parameter pairo = (Parameter) o;
        return this.parameter.equals(pairo.getParameter()) &&
                this.type.equals(pairo.getType());
    }

}
