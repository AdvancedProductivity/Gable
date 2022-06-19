package org.adp.gable.common.beans;

import lombok.Data;
import org.adp.gable.common.utils.I18nUtils;
import org.adp.gable.common.web.ErrorResult;

/**
 * @author zzq
 */
@Data
public class Result<T> {
    private boolean result;
    private int code;
    private String message;
    private T data;

    public static Result<String> failure(ErrorResult errorResult) {
        return failure(errorResult, null);
    }

    public static Result<String> failure(ErrorResult errorResult, Object[] args) {
        Result<String> result = new Result<>();
        result.setResult(false);
        result.setData(null);
        result.setCode(errorResult.getErrorCode());
        result.setMessage(I18nUtils.getMessage(errorResult.getMessageI18nKey(), args));
        return result;
    }

    public static <S> Result<S> success(S data) {
        Result<S> result = new Result<>();
        result.setResult(true);
        result.setData(data);
        result.setCode(ErrorResult.SUCCESS_CODE);
        return result;
    }
}
