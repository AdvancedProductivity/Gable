package org.adp.gable.security.utils;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

/**
 * @author zzq
 */
public interface JwtConst {
    String TOKEN_HEADER = "Authorization";
    String TOKEN_PREFIX = "Bearer ";
    byte[] SECURITY_ARRAY = UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8);
    long ONLINE_TIME = 1000L * 60 * 60 * 21 * 10;
    String ISSUER_PREFIX = "Gable Server---";

    String CLAIM_KEY = "user";
    String JSON_RESPONSE = "application/json";
    String AUTH = "authorities";
    String ROLE_PREFIX = "ROLE_";
}
