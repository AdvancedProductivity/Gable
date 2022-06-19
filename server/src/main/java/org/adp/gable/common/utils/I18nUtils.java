package org.adp.gable.common.utils;

import lombok.extern.slf4j.Slf4j;
import org.adp.gable.common.web.SpringContextHolder;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContext;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Arrays;
import java.util.Locale;

/**
 * @author zzq
 */
@Slf4j
public class I18nUtils {

    public static String getMessage(String placeHolder, Object[] args) {
        final Locale locale = LocaleContextHolder.getLocale();
        return getMessage(placeHolder, args, locale);
    }

    public static String getMessage(String placeHolder, Object[] args, Locale locale) {
        String message = null;
        try {
            message = SpringContextHolder.getApplicationContext().getMessage(placeHolder, args, locale);
        } catch (NoSuchMessageException ex) {
            log.warn("i18n key:{} is missing. locale = {}, args = {}", placeHolder, locale, Arrays.toString(args), ex);
            return placeHolder;
        }
        return message;
    }
}
