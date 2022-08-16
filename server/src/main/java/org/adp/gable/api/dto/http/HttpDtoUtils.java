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

import static org.adp.gable.utils.JsonBuilderHolder.OBJECT_MAPPER;

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

    public static void transFromEntityToDto(HttpApiDto dto, HttpApi api) {
        BeanUtils.copyProperties(api, dto, "hostArr", "pathArray", "query", "header", "bodyForm", "bodyUrlEncoded");
        setApiToDto(dto, api);
    }

    private static void setDtoToEntity(HttpApiDto dto, HttpApi api) {
        handleDefaultValue(dto);
        api.setHostArr(getStr(dto.getHostArr(), OBJECT_MAPPER));
        api.setPathArray(getStr(dto.getPathArray(), OBJECT_MAPPER));
        api.setQuery(getStr(dto.getQuery(), OBJECT_MAPPER));
        api.setHeader(getStr(dto.getHeader(), OBJECT_MAPPER));
        api.setBodyForm(getStr(dto.getBodyForm(), OBJECT_MAPPER));
        api.setBodyUrlEncoded(getStr(dto.getBodyUrlEncoded(), OBJECT_MAPPER));
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
        dto.setHostArr(getStrArrayList(api.getHostArr(), OBJECT_MAPPER));
        dto.setPathArray(getStrArrayList(api.getPathArray(), OBJECT_MAPPER));
        dto.setQuery(getKeyValue(api.getQuery(), OBJECT_MAPPER));
        dto.setHeader(getKeyValue(api.getHeader(), OBJECT_MAPPER));
        dto.setBodyForm(getFormKeyValue(api.getBodyForm(), OBJECT_MAPPER));
        dto.setBodyUrlEncoded(getKeyValue(api.getBodyUrlEncoded(), OBJECT_MAPPER));
        handleDefaultValue(dto);
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

    private static void handleDefaultValue(HttpApiDto dto) {
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
}
