package com.cryptocaddy.services.auditing.dao;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Exchange {
    @Id
    private String xid;
    private String name;


    public Exchange(String xid, String name) {
        this.xid = xid;
        this.name = name;
    }

    public Exchange() {
    }

    public String getXid() {
        return xid;
    }

    public void setXid(String xid) {
        this.xid = xid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
