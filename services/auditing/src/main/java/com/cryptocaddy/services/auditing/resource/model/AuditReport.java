package com.cryptocaddy.services.auditing.resource.model;

public class AuditReport {
    private String type;
    private String name;

    public AuditReport() {

    }

    @SuppressWarnings("unused")
    public String getType() {
        return type;
    }


    public void setType(String type) {
        this.type = type;
    }

    @SuppressWarnings("unused")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
