package com.cryptocaddy.services.auditing.database.entity

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.OneToMany

@Entity
class User {
    @Id
    var uid: String? = null //this must be nullable because persistence layer requires it. SQL table structure won't allow null though
    var email: String? = null
    var name: String? = null

    @OneToMany(mappedBy = "user")
    private var exchanges: MutableList<UserExchange>? = null

    constructor(uid: String, email: String, name: String?) {
        this.uid = uid
        this.email = email
        this.name = name
    }

    constructor() {}

    fun getExchanges(): List<UserExchange>? {
        return exchanges
    }

    fun setExchanges(exchanges: MutableList<UserExchange>) {
        this.exchanges = exchanges
    }

    fun addExchange(userExchange: UserExchange) {
        //TODO: ensure it doesn't already have an exchange that matches (didn't do it cuz kotlin checking was putting up a road block
        this.exchanges?.add(userExchange)

    }
}
