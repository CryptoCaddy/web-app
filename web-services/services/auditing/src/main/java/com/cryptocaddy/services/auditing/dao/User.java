package com.cryptocaddy.services.auditing.dao;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.List;

@Entity
public class User {
    @Id
    private String uid;
    private String email;
    private String name;

    @OneToMany(mappedBy="user")
    private List<UserExchange> exchanges;

    public User(String uid, String email, String name) {
        this.uid = uid;
        this.email = email;
        this.name = name;
    }

    public User() {
    }

    public List<UserExchange> getExchanges() {
        return exchanges;
    }

    public void setExchanges(List<UserExchange> exchanges) {
        this.exchanges = exchanges;
    }

    public void addExchange(UserExchange userExchange){
        this.exchanges.add(userExchange);
        if (userExchange.getUser() != this) {
            userExchange.setUser(this);
        }

    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
