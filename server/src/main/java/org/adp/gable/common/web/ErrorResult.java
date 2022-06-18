package org.adp.gable.common.web;

/**
 * @author zzq
 */
public interface ErrorResult {
    Integer SUCCESS_CODE = 100;

    /**
     * return the error code
     *
     * @return code
     */
    int getErrorCode();

    /**
     * return the error message tip
     *
     * @return i18n
     */
    String getMessageI18nKey();
}
