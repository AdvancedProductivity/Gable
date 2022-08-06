package org.adp.gable.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zzq
 */
@RestController
@RequestMapping("api/apiRunner")
@Slf4j
public class ApiRunnerController {

    @PostMapping
    public ObjectNode runner(@RequestBody ObjectNode req) {
        log.info("run data: {}", req.toPrettyString());
        return req;
    }

}
