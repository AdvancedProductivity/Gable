package org.adp.gable.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.adp.gable.common.beans.Result;
import org.adp.gable.security.dtos.UserDto;
import org.adp.gable.security.utils.JwtConst;
import org.adp.gable.security.utils.JwtUtils;
import org.adp.gable.security.utils.SecurityErrorResult;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author zzq
 */
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {


    private final AuthenticationManager authenticationManager;

    private ObjectMapper objectMapper;

    protected LocaleResolver localeResolver;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, ObjectMapper objectMapper) {
        this.authenticationManager = authenticationManager;
        this.objectMapper = objectMapper;
        super.setFilterProcessesUrl(JwtConst.LOGIN_PATH);
        setPostOnly(false);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        UserDto userDto = (UserDto) authResult.getPrincipal();
        userDto.setPassword(null);
        final String token = JwtUtils.generateToken(
                System.currentTimeMillis() + JwtConst.ONLINE_TIME,
                userDto,
                request.getRequestURI(),
                objectMapper
        );
        response.setHeader(JwtConst.TOKEN_HEADER, token);
        Result<UserDto> userDtoResult = Result.success(userDto);
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE);
        response.getWriter().write(objectMapper.writeValueAsString(userDtoResult));
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        log.error("auth error exp type: {}", failed.getClass().getName(), failed);
        if (failed instanceof InternalAuthenticationServiceException) {
            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE);
            final Result<String> failure = Result.failure(SecurityErrorResult.USER_NOT_EXIST);
            response.getWriter().write(objectMapper.writeValueAsString(failure));
            return;
        } else if (failed instanceof BadCredentialsException) {
            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE);
            final Result<String> failure = Result.failure(SecurityErrorResult.PASSWORD_ERROR);
            response.getWriter().write(objectMapper.writeValueAsString(failure));
            return;
        }
        super.unsuccessfulAuthentication(request, response, failed);
    }

    @Override
    public void setPostOnly(boolean postOnly) {
        super.setPostOnly(false);
    }

    @Override
    protected AuthenticationManager getAuthenticationManager() {
        final AuthenticationManager authenticationManager = super.getAuthenticationManager();
        log.info("father is null = {}", authenticationManager == null);
        return this.authenticationManager;
    }
}
