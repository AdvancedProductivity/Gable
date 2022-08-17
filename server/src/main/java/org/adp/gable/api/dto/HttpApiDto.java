package org.adp.gable.api.dto;

import lombok.Data;
import org.adp.gable.api.dto.http.DocJsonNode;
import org.adp.gable.api.dto.http.FormKeyValueDto;
import org.adp.gable.api.dto.http.KeyValueDto;

import java.util.List;

/**
 * @author zzq
 */
@Data
public class HttpApiDto {
    private Long id;
    private String protocol;
    private String method;
    private String host;
    private List<String> hostArr;
    private String port;
    private String path;
    private List<String> pathArray;

    private String url;

    private List<KeyValueDto> query;
    private List<KeyValueDto> header;

    private String bodyType;

    private List<FormKeyValueDto> bodyForm;
    private List<KeyValueDto> bodyUrlEncoded;
    private String bodyText;
    private String bodyTextType;
    private String bodyGraphQlQuery;
    private String bodyGraphQlVar;
    private DocJsonNode bodyTextDoc;
    private DocJsonNode respBodyTextDoc;
    private Long version;
}
