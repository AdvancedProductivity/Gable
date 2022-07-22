package org.adp.gable.security.controller;

import org.adp.gable.common.beans.Result;
import org.apache.commons.io.FileUtils;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

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
    private Result<String> postFile(MultipartFile uploadFile) throws IOException {
        System.out.println("file name: " + uploadFile.getName());
        System.out.println("file getOriginalFilename: " + uploadFile.getOriginalFilename());
        final File file = FileUtils.getFile("C:\\app\\nginx\\html\\a\\", uploadFile.getOriginalFilename());
        FileUtils.copyInputStreamToFile(uploadFile.getInputStream(), file);
        String name = uploadFile == null ? "'empty file'" : uploadFile.getOriginalFilename();
        return Result.success(name);
    }
}
