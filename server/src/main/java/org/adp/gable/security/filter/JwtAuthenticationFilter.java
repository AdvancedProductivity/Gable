package org.adp.gable.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.adp.gable.common.beans.Result;
import org.adp.gable.security.dtos.UserDto;
import org.adp.gable.security.utils.JwtConst;
import org.adp.gable.security.utils.SecurityErrorResult;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

/**
 * @author zzq
 */
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {


    private AuthenticationManager authenticationManager;

    private ObjectMapper objectMapper;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, ObjectMapper objectMapper) {
        this.authenticationManager = authenticationManager;
        this.objectMapper = objectMapper;
        super.setFilterProcessesUrl("/api/user/login");
        setPostOnly(false);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        UserDto userDto = (UserDto) authResult.getPrincipal();
        userDto.setPassword(null);
        Algorithm algorithm = Algorithm.HMAC256(JwtConst.SECURITY_ARRAY);
        final String token = JWT.create()
                .withSubject(userDto.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtConst.ONLINE_TIME))
                .withIssuer(JwtConst.ISSUER_PREFIX + request.getRequestURI())
                .withIssuedAt(new Date())
                .withClaim(JwtConst.CLAIM_KEY, objectMapper.writeValueAsString(userDto))
                .sign(algorithm);
        response.setHeader(JwtConst.TOKEN_HEADER, token);
        Result<UserDto> userDtoResult = Result.success(userDto);
        response.setHeader(HttpHeaders.CONTENT_TYPE, JwtConst.JSON_RESPONSE);
        response.getWriter().write(objectMapper.writeValueAsString(userDtoResult));
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        log.error("auth error exp type: {}", failed.getClass().getName(), failed);
        if (failed instanceof InternalAuthenticationServiceException) {
            final Result<String> failure = Result.failure(SecurityErrorResult.USER_NOT_EXIST);
            response.getWriter().write(objectMapper.writeValueAsString(failure));
            return;
        } else if (failed instanceof BadCredentialsException) {
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
