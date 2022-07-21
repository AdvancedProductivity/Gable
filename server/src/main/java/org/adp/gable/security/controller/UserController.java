package org.adp.gable.security.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zzq
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping
    private String hello() {
        return "Hello World";
    }
}
