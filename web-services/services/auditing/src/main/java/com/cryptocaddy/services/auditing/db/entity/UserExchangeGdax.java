package com.cryptocaddy.services.auditing.db.entity;

import javax.persistence.*;

@Entity
public class UserExchangeGdax {

    @Id
    @Column(name = "user_exchange_id")
    private Integer id;

    @OneToOne
    @PrimaryKeyJoinColumn
    private UserExchange userExchange;

    @Column(nullable = false)
    private String gdaxParaphrase;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserExchange getUserExchange() {
        return userExchange;
    }

    public void setUserExchange(UserExchange userExchange) {
        this.userExchange = userExchange;
    }

    public String getGdaxParaphrase() {
        return gdaxParaphrase;
    }

    public void setGdaxParaphrase(String gdaxParaphrase) {
        this.gdaxParaphrase = gdaxParaphrase;
    }
}
