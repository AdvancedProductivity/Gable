package org.adp.gable.api.dto.http;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.beans.Transient;

/**
 * @author zzq
 */
@Data
public class KeyValueDto {
    private Boolean using;
    private String key;
    private String value;
    private String desc;

    @Transient
    public boolean isNotIgnore() {
        if (!using) {
            return false;
        }
        return StringUtils.isNotEmpty(key) || StringUtils.isNotEmpty(value);
    }
}
