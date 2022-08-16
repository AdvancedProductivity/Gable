package org.adp.gable.common.dto;

import lombok.Data;

import java.util.Date;

@Data
public class BaseDto {
    private Long tenantId;
    private Long createdBy;
    private Date dateCreated;
    private Long modifiedBy;
    private Date dateModified;
    private String operationUrl;
    private String dataFrom;
}
