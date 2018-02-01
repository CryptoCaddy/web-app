package com.cryptocaddy.services.auditing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@SpringBootApplication
@ComponentScan(basePackages = {"io.swagger", "com.cryptocaddy.*"})
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
