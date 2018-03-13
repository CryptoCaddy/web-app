package com.cryptocaddy.auditing

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AuditingApplication

fun main(args: Array<String>) {
    runApplication<AuditingApplication>(*args)
}
