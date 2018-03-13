package com.cryptocaddy.services.auditing;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import java.io.FileInputStream;
import java.io.IOException;

//import org.springframework.data.jpa.repository.config.EnableJPARepositories;


@SpringBootApplication
@ComponentScan(basePackages = {"io.swagger", "com.cryptocaddy.*"})
//@EnableJpaRepositories("com.cryptocaddy.*")
@EntityScan("com.cryptocaddy.*")
public class Application extends SpringBootServletInitializer{
    Application() {
        // Do not use
    }

    public static void main(String[] args) {
        Object[] sources = {Application.class};


        String bypassFirebaseAuthentication = System.getenv("bypass_firebase_auth");
        if (bypassFirebaseAuthentication == null || bypassFirebaseAuthentication.toUpperCase() != "TRUE"){
            // Initialize Firebase
            String credentialsPath = System.getenv("FIREBASE_CRED_PATH");
            try {
                // [START initialize]
                FileInputStream serviceAccount = new FileInputStream(credentialsPath);
                FirebaseOptions options = new FirebaseOptions.Builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();


                FirebaseApp.initializeApp(options);
                // [END initialize]
            } catch (IOException e) {
                System.out.println("ERROR: invalid service account credentials..");
                System.out.println(e.getMessage());


                System.exit(1);
            }
        }



        final ConfigurableApplicationContext applicationContext = SpringApplication.run(sources, args);
        Runtime.getRuntime().addShutdownHook(new Thread(applicationContext::close));

    }



}
