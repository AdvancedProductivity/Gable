package org.adp.gable.common.web;

/**
 * @author zzq
 */
public class SampleResultCode implements ErrorResult {

    private final int errorCode;
    private final String errorMessageI18nKey;


    public SampleResultCode(int errorCode, String errorMessageI18nKey) {
        this.errorCode = errorCode;
        this.errorMessageI18nKey = errorMessageI18nKey;
    }

    @Override
    public int getErrorCode() {
        return errorCode;
    }

    @Override
    public String getMessageI18nKey() {
        return errorMessageI18nKey;
    }
}
