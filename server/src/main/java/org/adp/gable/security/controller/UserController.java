package org.adp.gable.security.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    @PostMapping
    private String postFile(MultipartFile uploadFile) throws IOException {
        System.out.println(new String(uploadFile.getBytes()));
        return uploadFile == null ? "'empty file'" : uploadFile.getOriginalFilename();
    }
}
