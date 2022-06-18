package org.adp.gable.security.controller;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@RestController
//@RequestMapping("/api/user")
//public class TestController {
//
//    @GetMapping("testAnoP")
//    @PreAuthorize("hasAuthority('sec_createUser')")
//    public String testAno(){
//        return "testAnoP ok";
//    }
//
//    @GetMapping("testAnoR")
//    @PreAuthorize("hasRole('SUPPER_ROLE')")
//    public String testAnoR(){
//        return "testAnoR ok";
//    }
//}
