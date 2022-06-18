package org.adp.gable.security.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zzq
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("test")
    public String testMethod(){
        return "test";
    }

    @GetMapping("testAnoP")
    @PreAuthorize("hasAuthority('sec_createUser')")
    public String testAno(){
        return "testAnoP ok";
    }

    @GetMapping("testAnoR")
    @PreAuthorize("hasRole('SUPPER_ROLE')")
    public String testAnoR(){
        return "testAnoR ok";
    }

    @GetMapping("testConfigP")
    public String testConfigP(){
        return "testConfigP ok";
    }

    @GetMapping("testConfigR")
    public String testConfigR(){
        return "testConfigR ok";
    }
}
