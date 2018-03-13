package com.cryptocaddy.services.auditing.restconfig.docs;

import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Created by: Nick Fields
 * Date: 1/8/2018
 */
@Configuration
@EnableSwagger2
@SuppressWarnings("all")
public class SwaggerConfig {

    @Bean
    @SuppressWarnings("all")
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("rest-apis")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.cryptocaddy.services.auditing"))
                .paths(Predicates.not(PathSelectors.regex("/error")))
                .build()
                .apiInfo(apiInfo());
    }

    @Bean
    @SuppressWarnings("all")
    public Docket springApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("spring-actuator-apis")
                .select()
                .apis(RequestHandlerSelectors.basePackage("org.springframework.boot.actuate"))
                .paths(Predicates.not(PathSelectors.regex("/error")))
                .build()
                .apiInfo(springApiInfo());
    }

    @Bean
    @SuppressWarnings("all")
    public Docket swaggerApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("swagger-apis")
                .select()
                .apis(RequestHandlerSelectors.basePackage("springfox.documentation.swagger"))
                .paths(Predicates.not(PathSelectors.regex("/error")))
                .build()
                .apiInfo(swaggerApiInfo());
    }

    private ApiInfo apiInfo() {
        String description = "CryptoCaddy REST Services";
        return new ApiInfoBuilder()
                .title("CryptoCaddy APIs")
                .description(description)
                .termsOfServiceUrl("http://springfox.io")
                .license("Apache License Version 2.0")
                .termsOfServiceUrl("svn")
                .version("2.0")
                .contact(new Contact("", "", ""))
                .build();
    }

    private ApiInfo swaggerApiInfo() {
        String description = "Swagger Documentation";
        return new ApiInfoBuilder()
                .title("Overview")
                .description(description)
                .termsOfServiceUrl("http://springfox.io")
                .license("Apache License Version 2.0")
                .termsOfServiceUrl("svn")
                .version("2.0")
                .contact(new Contact("", "", ""))
                .build();
    }

    private ApiInfo springApiInfo() {
        String description = "Spring Boot Actuators";
        return new ApiInfoBuilder()
                .title("Overview")
                .description(description)
                .termsOfServiceUrl("http://springfox.io")
                .license("Apache License Version 2.0")
                .termsOfServiceUrl("svn")
                .version("2.0")
                .contact(new Contact("", "", ""))
                .build();
    }

}
