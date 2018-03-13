package com.cryptocaddy.services.auditing.dto.request

import javax.xml.bind.annotation.XmlRootElement
import java.util.HashMap

@XmlRootElement
class RequestAddExchange {

    var exchangeName = String()
    var parameters: Map<String, String>? = null

    constructor(parameters: Map<String, String>) {
        this.parameters = parameters
    }

    constructor() {
        parameters = HashMap()
    }
}
