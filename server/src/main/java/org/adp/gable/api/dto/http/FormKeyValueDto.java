package org.adp.gable.api.dto.http;

import lombok.Data;

/**
 * @author zzq
 */
@Data
public class FormKeyValueDto extends KeyValueDto {
    private String type;
    private String fileName;
    private String fileId;
}
