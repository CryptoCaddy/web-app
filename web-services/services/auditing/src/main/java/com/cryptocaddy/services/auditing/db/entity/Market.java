package com.cryptocaddy.services.auditing.db.entity;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"exchange_id", "name"})})
public class Market {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Exchange exchange;

    @ManyToOne
    @JoinColumn(name = "trading_currency_id", nullable = false)
    private Currency trading;

    @ManyToOne
    @JoinColumn(name = "base_currency_id", nullable = false)
    private Currency base;

    @Column(nullable = false)
    private String name;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Exchange getExchange() {
        return exchange;
    }

    public void setExchange(Exchange exchange) {
        this.exchange = exchange;
    }

    public Currency getTrading() {
        return trading;
    }

    public void setTrading(Currency trading) {
        this.trading = trading;
    }

    public Currency getBase() {
        return base;
    }

    public void setBase(Currency base) {
        this.base = base;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
