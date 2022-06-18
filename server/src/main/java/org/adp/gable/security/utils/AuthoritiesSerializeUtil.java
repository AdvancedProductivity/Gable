package org.adp.gable.security.utils;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.KeyDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.util.Converter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.util.*;

/**
 * @author zzq
 */
public class AuthoritiesSerializeUtil extends StdDeserializer<Set<SimpleGrantedAuthority>> {
    public AuthoritiesSerializeUtil() {
        this(null);
    }
    protected AuthoritiesSerializeUtil(Class<?> vc) {
        super(vc);
    }

    @Override
    public Set<SimpleGrantedAuthority> deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        return Collections.emptySet();
    }
}
