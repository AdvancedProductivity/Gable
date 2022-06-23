package org.adp.gable.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.common.beans.Result;
import org.springframework.test.web.servlet.MvcResult;

import java.io.IOException;

public class ResultUtils {

    private static ObjectMapper MAPPER = new ObjectMapper();

    public static <T> Result<T> readResult(MvcResult res, ObjectMapper objectMapper) throws IOException {
        return objectMapper.readValue(res.getResponse().getContentAsByteArray(),
                new TypeReference<Result<T>>() {
                }
        );
    }

    public static <T> Result<T> readResult(MvcResult res) throws IOException {
        return readResult(res, MAPPER);
    }
}
