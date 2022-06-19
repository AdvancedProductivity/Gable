package org.adp.gable.Controller;

import org.adp.gable.common.beans.Result;
import org.adp.gable.security.dao.UserRepository;
import org.adp.gable.security.entity.UserEntity;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/all")
@Profile("SECURITY_MOCK")
public class NoPermissionController {

    @Resource
    private UserRepository userRepository;

    @GetMapping("/randomStr")
    public Result<String> testRandomStr() {
        return Result.success(RandomStringUtils.random(10, true, true));
    }

    @GetMapping("/user_initCreated")
    public Result<UserEntity> createdUserInit() {
        UserEntity user = new UserEntity();
        user.initBeforeSave();
        return Result.success(user);
    }

    @GetMapping("/user_initUpdated")
    public Result<UserEntity> updateUserInit() {
        final UserEntity user = userRepository.findById(0L).orElse(null);
        if (user != null) {
            user.initBeforeUpdate();
        }
        return Result.success(user);
    }

}
