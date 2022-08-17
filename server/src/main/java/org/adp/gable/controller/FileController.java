package org.adp.gable.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.adp.gable.common.beans.Result;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/file")
public class FileController {

    @Value("${local.filepath}")
    private String localFilepath;

    @Resource
    private ObjectMapper objectMapper;


    @PostMapping
    public ObjectNode post(
            @RequestParam(value = "file") MultipartFile file,
            @RequestParam(required = true) String from,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String tag) {
        if (StringUtils.isEmpty(name)) {
            name = file.getOriginalFilename();
        }
        String saveFileName = null;
        String fileSuffix = StringUtils.substringAfterLast(file.getOriginalFilename(), ".");
        if (!StringUtils.isEmpty(tag)) {
            saveFileName = tag + "/" + System.currentTimeMillis() + "." + fileSuffix;
        }else {
            saveFileName =  System.currentTimeMillis() + "." + fileSuffix;
        }
        String s = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        final ObjectNode objectNode = objectMapper.createObjectNode();
        String p = "file/" + s + "/" + saveFileName;
        try {
            File dest = FileUtils.getFile(localFilepath, "file", s, saveFileName);
            FileUtils.copyInputStreamToFile(file.getInputStream(), dest);
        } catch (Exception e) {
        }
        objectNode.put("success", 1);
        objectNode.set("file", objectMapper.createObjectNode()
                .put("url", from + "/static/" + p)
                .put("path", p)
                .put("name", name)
        );
        return objectNode;
    }
}
