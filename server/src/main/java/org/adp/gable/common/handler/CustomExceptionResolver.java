package org.adp.gable.common.handler;

import lombok.extern.slf4j.Slf4j;
import org.adp.gable.common.beans.Result;
import org.adp.gable.common.web.CommonErrorResult;
import org.adp.gable.security.utils.SecurityErrorResult;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * @author zzq
 */
@ControllerAdvice
@Slf4j
public class CustomExceptionResolver extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = NullPointerException.class)
    @ResponseBody
    public Result<String> handleAuthenticationError(Exception e) {
        log.error("NPE error happens", e);
        return Result.failure(CommonErrorResult.SYSTEM_NPE_ERROR);
    }
}
