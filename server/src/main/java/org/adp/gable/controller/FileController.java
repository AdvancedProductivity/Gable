package org.adp.gable.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/api/file")
public class FileController {
    private static final DateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    private static final DateFormat TIME_FORMAT = new SimpleDateFormat("HH-mm-ss");

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
        Date now = new Date();
        String time = TIME_FORMAT.format(now);
        if (!StringUtils.isEmpty(tag)) {
            saveFileName = tag + "/" + time + "_" + RandomStringUtils.random(10, true, false) + "." + fileSuffix;
        }else {
            saveFileName = time + "_" + RandomStringUtils.random(10, true, false) + "." + fileSuffix;
        }
        String date = DATE_FORMAT.format(now);
        final ObjectNode objectNode = objectMapper.createObjectNode();
        String pathWithName = "file/" + date + "/" + saveFileName;
        try {
            File dest = FileUtils.getFile(localFilepath, "file", date, saveFileName);
            FileUtils.copyInputStreamToFile(file.getInputStream(), dest);
        } catch (Exception e) {
        }
        objectNode.put("success", 1);
        String connectChar = StringUtils.endsWith(fileSuffix, "/") ? "" : "/";
        objectNode.set("file", objectMapper.createObjectNode()
                .put("url", from + connectChar + "static/" + pathWithName)
                .put("path", pathWithName)
                .put("id", RandomStringUtils.random(10, true, false))
                .put("name", name)
        );
        return objectNode;
    }
}
