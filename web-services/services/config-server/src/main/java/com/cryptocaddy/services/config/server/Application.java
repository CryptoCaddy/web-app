package com.cryptocaddy.services.config.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.context.ConfigurableApplicationContext;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */

@SpringBootApplication
@EnableConfigServer
public class Application {
    Application() {
        // Do not use
    }

    public static void main(String[] args) {
        Class[] sources = {Application.class};
        final ConfigurableApplicationContext applicationContext = SpringApplication.run(sources, args);
        Runtime.getRuntime().addShutdownHook(new Thread(applicationContext::close));
    }

}
