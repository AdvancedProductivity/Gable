package org.adp.gable.Controller;


import org.springframework.context.annotation.Profile;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.PermitAll;

/**
 * write for test
 * */
@RestController
@RequestMapping("/api/user")
@Profile("SECURITY_MOCK")
public class TestUserController {

    @GetMapping("testConfigP")
    public String testConfigP(){
        return "testConfigP ok";
    }

    @GetMapping("testConfigR")
    public String testConfigR(){
        return "testConfigR ok";
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

    @GetMapping("testNPE")
    @PermitAll
    public String testNPE() {
        throw new NullPointerException("random");
    }
}
