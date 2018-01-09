package com.cryptocaddy.services.auditing.resource.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@Controller
public class HomeController {

    @RequestMapping(value = "/")
    public String index() {
        return "redirect:swagger-ui.html";
    }

    @RequestMapping(value = "/api")
    public String indexContext() {
        return "redirect:swagger-ui.html";
    }

}
