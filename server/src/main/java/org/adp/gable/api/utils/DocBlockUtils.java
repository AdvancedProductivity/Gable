package org.adp.gable.api.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.adp.gable.api.dto.HttpApiDto;
import org.adp.gable.api.dto.doc.DocBlockDto;
import org.adp.gable.api.dto.http.DocJsonNode;
import org.adp.gable.api.dto.http.DocJsonTableNode;
import org.adp.gable.api.dto.http.FormKeyValueDto;
import org.adp.gable.api.dto.http.KeyValueDto;
import org.adp.gable.api.entity.ApiCollection;
import org.adp.gable.api.entity.ApiMenuItem;
import org.adp.gable.utils.JsonBuilderHolder;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Locale;

/**
 * @author zzq
 * */
public class DocBlockUtils {

    public static DocBlockDto generateHttpRunner(HttpApiDto waitForSave, int order, Long docDefineId,
                                                 ApiMenuItem httpMenuData, ApiCollection collectionData) {
        String collectionName = "";
        Long collectionId = 0L;
        if (collectionData != null) {
            collectionName = collectionData.getName();
            collectionId = collectionData.getId();
        }
        ObjectMapper objectMapper = JsonBuilderHolder.OBJECT_MAPPER;
        DocBlockDto dto = getDto(order, docDefineId);
        dto.setType("http");
        dto.setConfig(objectMapper.createObjectNode());
        dto.setData(objectMapper
                .createObjectNode()
                .put("collectionId", collectionId)
                .put("httpId", httpMenuData.getId())
                .put("httpName", httpMenuData.getName())
                .put("collectionName", collectionName)
                .put("version", httpMenuData.getVersion())
                .set("define", objectMapper.convertValue(waitForSave, ObjectNode.class))
        );
        return dto;
    }

    public static DocBlockDto generateTitle(String text, int order, Long docDefineId) {
        ObjectMapper objectMapper = JsonBuilderHolder.OBJECT_MAPPER;
        DocBlockDto dto = getDto(order, docDefineId);
        dto.setType("header");
        dto.setConfig(objectMapper.createObjectNode());
        dto.setData(objectMapper
                .createObjectNode()
                .put("text", text)
                .put("level", 3)
        );
        return dto;
    }
    public static DocBlockDto generateUrlBlock(HttpApiDto waitForSave, int order, Long docDefineId) {
        ObjectMapper objectMapper = JsonBuilderHolder.OBJECT_MAPPER;
        DocBlockDto dto = getDto(order, docDefineId);
        dto.setType("url");
        dto.setConfig(objectMapper.createObjectNode());
        String url = StringUtils.substringBeforeLast(waitForSave.getUrl(), "?");
        dto.setData(objectMapper
                .createObjectNode()
                .put("host", waitForSave.getHost())
                .put("path", waitForSave.getPath())
                .put("url", url)
        );
        return dto;
    }

    public static DocBlockDto generateRawText(HttpApiDto waitForSave, int order, Long docDefineId) {
        ObjectMapper objectMapper = JsonBuilderHolder.OBJECT_MAPPER;
        DocBlockDto dto = getDto(order, docDefineId);
        dto.setType("rawText");
        dto.setConfig(objectMapper.createObjectNode());
        dto.setData(objectMapper
                .createObjectNode()
                .put("text", waitForSave.getBodyText())
                .put("lang", waitForSave.getBodyTextType())
        );
        return dto;
    }

    public static DocBlockDto generateJsonTree(List<DocJsonTableNode> docJsonTableNodes, int order, Long docDefineId) {
        ObjectMapper objectMapper = JsonBuilderHolder.OBJECT_MAPPER;
        DocBlockDto dto = getDto(order, docDefineId);
        dto.setType("jsonTree");
        dto.setConfig(objectMapper.createObjectNode());
        dto.setData(objectMapper
                .createObjectNode()
                .set("nodes", objectMapper.convertValue(docJsonTableNodes, ArrayNode.class))
        );
        return dto;
    }

    public static DocBlockDto generateRequestType(HttpApiDto waitForSave, int order, Long docDefineId) {
        ObjectMapper objectMapper = JsonBuilderHolder.OBJECT_MAPPER;
        DocBlockDto dto = getDto(order, docDefineId);
        ArrayNode arrayNode = objectMapper.createArrayNode();
        String method = waitForSave.getMethod().toUpperCase(Locale.ROOT);
        arrayNode.add(method);
        if (StringUtils.equals(method, "POST") || StringUtils.equals(method, "PUT")) {
            String bodyType = waitForSave.getBodyType();
            arrayNode.add(bodyType.toLowerCase(Locale.ROOT));
            if (StringUtils.equalsIgnoreCase(bodyType, "raw")) {
                arrayNode.add(waitForSave.getBodyTextType().toLowerCase(Locale.ROOT));
            }
        }
        dto.setType("list");
        dto.setConfig(objectMapper.createObjectNode());
        dto.setData(objectMapper
                .createObjectNode()
                .put("style", "unordered")
                .set("items", arrayNode)
        );
        return dto;
    }

    public static DocBlockDto generateTableForKeyValue(List<KeyValueDto> list, int order, Long docDefineId) {
        ObjectMapper objectMapper = JsonBuilderHolder.OBJECT_MAPPER;
        DocBlockDto dto = getDto(order, docDefineId);
        dto.setType("table");
        dto.setConfig(objectMapper.createObjectNode());
        ArrayNode arrayNode = objectMapper.createArrayNode();
        arrayNode.add(
                objectMapper.createArrayNode()
                        .add("Param Name")
                        .add("Param Description")
                        .add("Sample Value")
        );
        for (KeyValueDto keyValueDto : list) {
            arrayNode.add(
                    objectMapper
                            .createArrayNode()
                            .add(keyValueDto.getKey())
                            .add(keyValueDto.getDesc())
                            .add(keyValueDto.getValue())
            );
        }
        dto.setData(objectMapper
                .createObjectNode()
                .put("withHeadings", true)
                .set("content", arrayNode)
        );
        return dto;
    }

    public static DocBlockDto generateTableForForm(List<FormKeyValueDto> list, int order, Long docDefineId) {
        ObjectMapper objectMapper = JsonBuilderHolder.OBJECT_MAPPER;
        DocBlockDto dto = getDto(order, docDefineId);
        dto.setType("table");
        dto.setConfig(objectMapper.createObjectNode());
        ArrayNode arrayNode = objectMapper.createArrayNode();
        arrayNode.add(
                objectMapper.createArrayNode()
                        .add("Param Name")
                        .add("Type")
                        .add("Param Description")
                        .add("Sample Value")
        );
        for (FormKeyValueDto formKeyValueDto : list) {
            ArrayNode tableCellText = objectMapper.createArrayNode();
            tableCellText.add(formKeyValueDto.getKey());
            tableCellText.add(formKeyValueDto.getType());
            tableCellText.add(formKeyValueDto.getDesc());
            if (StringUtils.equals(formKeyValueDto.getType(), "file")) {
                tableCellText.add("<a src='"+ formKeyValueDto.getFileUrl() +"' target=\"_blank\">"+ formKeyValueDto.getFileName() +"</a>");
            }else {
                tableCellText.add(formKeyValueDto.getValue());
            }
            arrayNode.add(tableCellText);
        }
        dto.setData(objectMapper
                .createObjectNode()
                .put("withHeadings", true)
                .set("content", arrayNode)
        );
        return dto;
    }

    public static DocBlockDto generateI18nTitle(String i18nk, int order, Long docDefineId) {
        ObjectMapper objectMapper = JsonBuilderHolder.OBJECT_MAPPER;
        DocBlockDto dto = getDto(order, docDefineId);
        dto.setType("i18nTitle");
        dto.setConfig(objectMapper.createObjectNode());
        dto.setData(objectMapper
                .createObjectNode()
                .put("i18n", i18nk)
                .put("level", 3)
        );
        return dto;
    }

    private static DocBlockDto getDto(int order, Long docDefineId) {
        DocBlockDto dto = new DocBlockDto();
        dto.setOrder(order);
        dto.setDocDefineId(docDefineId);
        dto.setId(RandomStringUtils.random(10, true, false));
        return dto;
    }
}
