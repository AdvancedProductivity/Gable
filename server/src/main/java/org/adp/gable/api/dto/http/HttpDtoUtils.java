package org.adp.gable.api.dto.http;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.adp.gable.api.dto.HttpApiDto;
import org.adp.gable.api.entity.HttpApi;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import java.util.Collections;
import java.util.List;

/**
 * @author zzq
 */
public class HttpDtoUtils {

    public static HttpApi transFromDtoToEntity(HttpApiDto dto) {
        HttpApi api = new HttpApi();
        BeanUtils.copyProperties(dto, api, "hostArr", "pathArray", "query", "header", "bodyForm", "bodyUrlEncoded");
        setDtoToEntity(dto, api);
        return api;
    }

    public static void transFromDtoToEntity(HttpApiDto dto, HttpApi api) {
        BeanUtils.copyProperties(dto, api, "hostArr", "pathArray", "query", "header", "bodyForm", "bodyUrlEncoded");
        setDtoToEntity(dto, api);
    }

    public static HttpApiDto transFromEntityToDto(HttpApi api) {
        HttpApiDto dto = new HttpApiDto();
        BeanUtils.copyProperties(api, dto, "hostArr", "pathArray", "query", "header", "bodyForm", "bodyUrlEncoded");
        setApiToDto(dto, api);
        return dto;
    }

    public static void transFroEntityToDto(HttpApiDto dto, HttpApi api) {
        BeanUtils.copyProperties(api, dto, "hostArr", "pathArray", "query", "header", "bodyForm", "bodyUrlEncoded");
        setApiToDto(dto, api);
    }

    private static void setDtoToEntity(HttpApiDto dto, HttpApi api) {
        final ObjectMapper objectMapper = new ObjectMapper();
        if (dto.getHostArr() == null) {
            dto.setHostArr(Collections.emptyList());
        }
        if (dto.getPathArray() == null) {
            dto.setPathArray(Collections.emptyList());
        }
        if (dto.getQuery() == null) {
            dto.setQuery(Collections.emptyList());
        }
        if (dto.getHeader() == null) {
            dto.setHeader(Collections.emptyList());
        }
        if (dto.getBodyForm() == null) {
            dto.setBodyForm(Collections.emptyList());
        }
        if (dto.getBodyUrlEncoded() == null) {
            dto.setBodyUrlEncoded(Collections.emptyList());
        }
        api.setHostArr(getStr(dto.getHostArr(), objectMapper));
        api.setPathArray(getStr(dto.getPathArray(), objectMapper));
        api.setQuery(getStr(dto.getQuery(), objectMapper));
        api.setHeader(getStr(dto.getHeader(), objectMapper));
        api.setBodyForm(getStr(dto.getBodyForm(), objectMapper));
        api.setBodyUrlEncoded(getStr(dto.getBodyUrlEncoded(), objectMapper));
    }

    private static String getStr(Object arr, ObjectMapper objectMapper) {
        try {
            return objectMapper.writeValueAsString(arr);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "";
        }
    }


    private static void setApiToDto(HttpApiDto dto, HttpApi api) {
        final ObjectMapper objectMapper = new ObjectMapper();
        dto.setHostArr(getStrArrayList(api.getHostArr(), objectMapper));
        dto.setPathArray(getStrArrayList(api.getPathArray(), objectMapper));
        dto.setQuery(getKeyValue(api.getQuery(), objectMapper));
        dto.setHeader(getKeyValue(api.getHeader(), objectMapper));
        dto.setBodyForm(getFormKeyValue(api.getBodyForm(), objectMapper));
        dto.setBodyUrlEncoded(getKeyValue(api.getBodyUrlEncoded(), objectMapper));
        if (dto.getHostArr() == null) {
            dto.setHostArr(Collections.emptyList());
        }
        if (dto.getPathArray() == null) {
            dto.setPathArray(Collections.emptyList());
        }
        if (dto.getQuery() == null) {
            dto.setQuery(Collections.emptyList());
        }
        if (dto.getHeader() == null) {
            dto.setHeader(Collections.emptyList());
        }
        if (dto.getBodyForm() == null) {
            dto.setBodyForm(Collections.emptyList());
        }
        if (dto.getBodyUrlEncoded() == null) {
            dto.setBodyUrlEncoded(Collections.emptyList());
        }

    }

    private static List<FormKeyValueDto> getFormKeyValue(String str, ObjectMapper objectMapper) {
        if (StringUtils.isEmpty(str)) {
            return null;
        }
        try {
            return objectMapper.readValue(str, new TypeReference<List<FormKeyValueDto>>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static List<KeyValueDto> getKeyValue(String str, ObjectMapper objectMapper) {
        if (StringUtils.isEmpty(str)) {
            return null;
        }
        try {
            return objectMapper.readValue(str, new TypeReference<List<KeyValueDto>>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static List<String> getStrArrayList(String hostArr, ObjectMapper objectMapper) {
        if (StringUtils.isEmpty(hostArr)) {
            return null;
        }
        try {
            return objectMapper.readValue(hostArr, new TypeReference<List<String>>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
