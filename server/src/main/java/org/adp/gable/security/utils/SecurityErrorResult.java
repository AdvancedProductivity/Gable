package org.adp.gable.security.utils;

import org.adp.gable.common.web.ErrorResult;
import org.adp.gable.common.web.SampleResultCode;

/**
 * @author zzq
 */
public interface SecurityErrorResult {

    ErrorResult USER_NOT_EXIST = new SampleResultCode(200, "USER_NOT_EXIST");
    ErrorResult PASSWORD_ERROR = new SampleResultCode(300, "PASSWORD_ERROR");
    ErrorResult LOGIN_EXPIRED = new SampleResultCode(400, "LOGIN_EXPIRED");
    ErrorResult ACCESS_DENIED = new SampleResultCode(403, "ACCESS_DENIED");
    ErrorResult NO_TOKEN_PROVIDED = new SampleResultCode(405, "NO_TOKEN_PROVIDED");
    ErrorResult TOKEN_INVALID = new SampleResultCode(406, "TOKEN_INVALID");
    ErrorResult JWT_UNKNOWN_ERROR = new SampleResultCode(407, "TOKEN_INVALID");
}
