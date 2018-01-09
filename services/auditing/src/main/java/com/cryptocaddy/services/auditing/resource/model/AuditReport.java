package com.cryptocaddy.services.auditing.resource.model;

public class AuditReport {
    private String type;
    private String name;

    public AuditReport() {
    }

    public AuditReport(String type, String name) {
        this.type = type;
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
