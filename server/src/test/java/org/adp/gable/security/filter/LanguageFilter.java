package org.adp.gable.security.filter;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Locale;

/**
 * if the RequestContextFilter not work
 *
 * @author zzq
 */
public class LanguageFilter extends OncePerRequestFilter {

    private LocaleResolver localeResolver;

    public LanguageFilter(LocaleResolver localeResolver) {
        this.localeResolver = localeResolver;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        boolean set = false;
        if (LocaleContextHolder.getLocaleContext() == null) {
            if (localeResolver != null) {
                final Locale locale = localeResolver.resolveLocale(request);
                LocaleContextHolder.setLocale(locale);
                set = true;
            }
        }
        try {
            filterChain.doFilter(request, response);
        } finally {
            if (set) {
                LocaleContextHolder.resetLocaleContext();
            }
        }
    }
}
