package org.adp.gable.api.dto.http;

import lombok.Data;

/**
 * @author zzq
 */
@Data
public class KeyValueDto {
    private Boolean using;
    private String key;
    private String value;
    private String desc;
}
