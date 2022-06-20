package org.adp.gable.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.adp.gable.common.beans.Result;
import org.adp.gable.security.utils.SecurityErrorResult;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author zzq
 */
@Slf4j
public class NoTokenProviderHandler implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    public NoTokenProviderHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        log.info("Pre-authenticated entry point called. Rejecting access", authException);
        if (authException instanceof InsufficientAuthenticationException) {
            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE);
            response.getWriter().write(objectMapper.writeValueAsString(Result.failure(SecurityErrorResult.NO_TOKEN_PROVIDED)));
        }
    }
}
