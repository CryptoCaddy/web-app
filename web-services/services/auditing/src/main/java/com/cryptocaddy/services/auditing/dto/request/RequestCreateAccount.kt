package com.cryptocaddy.services.auditing.dto.request

class RequestCreateAccount {

    var email: String? = null
    var token: String? = null

    constructor(email: String, token: String) {
        this.email = email
        this.token = token
    }

    constructor() {}
}
