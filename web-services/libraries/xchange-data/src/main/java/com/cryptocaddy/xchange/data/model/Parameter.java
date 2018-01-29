package com.cryptocaddy.xchange.data.model;


public class Parameter<L,R> {

    private final L parameter;
    private final R description;

    public Parameter(L parameter, R description) {
        this.parameter = parameter;
        this.description = description;
    }

    public L getParameter() { return parameter; }
    public R getDescription() { return description; }

    @Override
    public int hashCode() { return parameter.hashCode() ^ description.hashCode(); }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Parameter)) return false;
        Parameter pairo = (Parameter) o;
        return this.parameter.equals(pairo.getParameter()) &&
                this.description.equals(pairo.getDescription());
    }

}
