package org.adp.gable.Controller;

import org.adp.gable.common.beans.Result;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/all")
@Profile("SECURITY_MOCK")
public class NoPermissionController {

    @GetMapping("/randomStr")
    public Result<String> testRandomStr(){
        return Result.success(RandomStringUtils.random(10, true, true));
    }
}
