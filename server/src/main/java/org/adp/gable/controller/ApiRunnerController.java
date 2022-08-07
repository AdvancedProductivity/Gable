package org.adp.gable.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.adp.gable.common.beans.Result;
import org.adp.gable.runner.ActionType;
import org.adp.gable.runner.impl.HttpAction;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author zzq
 */
@RestController
@RequestMapping("api/apiRunner")
@Slf4j
public class ApiRunnerController {

    @Resource
    private ObjectMapper objectMapper;

    @PostMapping
    public ObjectNode runner(@RequestBody ObjectNode req) {
        final String type = req.path("type").asText();
        ObjectNode params = (ObjectNode) req.path("params");
        final ObjectNode response = objectMapper.createObjectNode();
        final HttpAction httpAction = new HttpAction();
        if (StringUtils.equalsIgnoreCase(type, ActionType.HTTP.name())) {
            httpAction.execute(params, response, objectMapper.createObjectNode(), objectMapper.createObjectNode());
        }
        log.info("run data: {}", req.toPrettyString());
        return response;
    }

    @GetMapping
    public Result<String> alive() {
        return Result.success(null);
    }

}
