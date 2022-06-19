package org.adp.gable.security.utils;

import org.adp.gable.common.web.ErrorResult;
import org.adp.gable.common.web.SampleResultCode;

/**
 * @author zzq
 */
public interface SecurityErrorResult {

    ErrorResult USER_NOT_EXIST = new SampleResultCode(200, "SEC.USER_NOT_EXIST");
    ErrorResult PASSWORD_ERROR = new SampleResultCode(300, "SEC.PASSWORD_ERROR");
    ErrorResult LOGIN_EXPIRED = new SampleResultCode(400, "SEC.LOGIN_EXPIRED");
    ErrorResult ACCESS_DENIED = new SampleResultCode(403, "SEC.ACCESS_DENIED");
    ErrorResult NO_TOKEN_PROVIDED = new SampleResultCode(405, "SEC.NO_TOKEN_PROVIDED");
    ErrorResult TOKEN_INVALID = new SampleResultCode(406, "SEC.TOKEN_INVALID");
    ErrorResult JWT_UNKNOWN_ERROR = new SampleResultCode(407, "SEC.JWT_UNKNOWN_ERROR");
}
