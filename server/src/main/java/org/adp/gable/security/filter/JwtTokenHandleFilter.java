package org.adp.gable.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.adp.gable.common.beans.Result;
import org.adp.gable.security.dtos.UserDto;
import org.adp.gable.security.utils.JwtConst;
import org.adp.gable.security.utils.SecurityErrorResult;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * @author zzq
 */
@Slf4j
public class JwtTokenHandleFilter extends BasicAuthenticationFilter {

    private final ObjectMapper objectMapper;

    public JwtTokenHandleFilter(AuthenticationManager authenticationManager, ObjectMapper objectMapper) {
        super(authenticationManager);
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {

        String tokenHeader = request.getHeader(JwtConst.TOKEN_HEADER);
        if (!StringUtils.startsWith(tokenHeader, JwtConst.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }
        try {
            String token = StringUtils.substringAfter(tokenHeader, JwtConst.TOKEN_PREFIX);
            Algorithm algorithm = Algorithm.HMAC256(JwtConst.SECURITY_ARRAY);
            JWTVerifier verifier = JWT.require(algorithm).build();
            final DecodedJWT decodedJwt = verifier.verify(token);
            String userInfoStr = decodedJwt.getClaim(JwtConst.CLAIM_KEY).asString();
            UserDto userDto = readUserFromToken(userInfoStr);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDto, null, userDto.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            super.doFilterInternal(request, response, chain);
        } catch (JWTDecodeException exception) {
            log.warn("jwt token:{} parser error", tokenHeader, exception);
            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE);
            response.getWriter().write(objectMapper.writeValueAsString(Result.failure(SecurityErrorResult.TOKEN_INVALID)));
        } catch (SignatureVerificationException exception) {
            log.warn("jwt token:{} parser error", tokenHeader, exception);
            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE);
            response.getWriter().write(objectMapper.writeValueAsString(Result.failure(SecurityErrorResult.LOGIN_EXPIRED)));
        } catch (TokenExpiredException exception) {
            log.warn("jwt token:{} have expired", tokenHeader, exception);
            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE);
            response.getWriter().write(objectMapper.writeValueAsString(Result.failure(SecurityErrorResult.LOGIN_EXPIRED)));
        }
    }

    private UserDto readUserFromToken(String userInfoStr) throws JsonProcessingException {
        final JsonNode userJsonNode = objectMapper.readTree(userInfoStr);
        final UserDto userDto = objectMapper.convertValue(userJsonNode, UserDto.class);
        final JsonNode path = userJsonNode.path(JwtConst.AUTH);
        Set<SimpleGrantedAuthority> authorities = new HashSet<>(path.size());
        for (JsonNode jsonNode : path) {
            authorities.add(new SimpleGrantedAuthority(jsonNode.path("authority").asText()));
        }
        userDto.setAuthorities(authorities);
        return userDto;
    }
}
