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
}
