package com.cryptocaddy.services.auditing.dao;

import javax.persistence.*;


@Entity
public class UserExchange {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    //exchange name
    private String name;
    //exchange api key
    private String apiKey;
    //exchange api secret
    private String secret;
    //exchange api pass
    private String passphrase;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;



    public UserExchange(String name, String key, String secret, String passphrase) {
        this.name = name;
        this.apiKey = key;
        this.secret = secret;
        this.passphrase = passphrase;
    }

    public UserExchange() { super(); }



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String key) {
        this.apiKey = key;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public String getPassphrase() {
        return passphrase;
    }

    public void setPassphrase(String passphrase) {
        this.passphrase = passphrase;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        if (user == null)
            return;

        this.user = user;
        if (!user.getExchanges().contains(this)) { // warning this may cause performance issues if you have a large data set since this operation is O(n)
            user.getExchanges().add(this);
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
