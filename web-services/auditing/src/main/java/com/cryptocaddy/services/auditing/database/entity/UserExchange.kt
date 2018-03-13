package com.cryptocaddy.services.auditing.database.entity

import javax.persistence.*


@Entity
class UserExchange {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null //this must be nullable because persistence layer requires it. SQL table structure won't allow null though

    //exchange name
    var name: String? = null
    //exchange api key
    var apiKey: String? = null
    //exchange api secret
    var secret: String? = null
    //exchange api pass
    var passphrase: String? = null

    @ManyToOne
    @JoinColumn(name = "uid")
    // warning this may cause performance issues if you have a large data set since this operation is O(n)
    var user: User? = null
        set(user) {
            if (user == null)
                return

            /*
            field = user
            if (user.getExchanges()?.contains(this)) {
                user.exchanges!!.add(this)
            }
            */
            field = user
            user.addExchange(this)
        }


    constructor(name: String, key: String, secret: String, passphrase: String?) {
        this.name = name
        this.apiKey = key
        this.secret = secret
        this.passphrase = passphrase
    }

    constructor() : super() {}
}
