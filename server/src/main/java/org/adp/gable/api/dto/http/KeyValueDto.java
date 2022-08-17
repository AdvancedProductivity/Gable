package org.adp.gable.api.dto.http;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

/**
 * @author zzq
 */
@Data
public class KeyValueDto {
    private Boolean using;
    private String key;
    private String value;
    private String desc;

    public boolean isNotIgnore() {
        if (!using) {
            return false;
        }
        return StringUtils.isNotEmpty(key) || StringUtils.isNotEmpty(value);
    }
}
