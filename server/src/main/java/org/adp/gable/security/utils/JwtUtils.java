package org.adp.gable.security.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.security.dtos.UserDto;

import java.util.Date;

/**
 * @author zzq
 */
public class JwtUtils {

    public static String generateToken(long l, UserDto userDto, String uri, ObjectMapper objectMapper) throws JsonProcessingException {
        Algorithm algorithm = Algorithm.HMAC256(JwtConst.SECURITY_ARRAY);
        return JWT.create()
                .withSubject(userDto.getEmail())
                .withExpiresAt(new Date(l))
                .withIssuer(JwtConst.ISSUER_PREFIX + uri)
                .withIssuedAt(new Date())
                .withClaim(JwtConst.CLAIM_KEY, objectMapper.writeValueAsString(userDto))
                .sign(algorithm);
    }
}
