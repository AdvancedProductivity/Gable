package org.adp.gable.api.dto.http;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.beans.Transient;

/**
 * @author zzq
 */
@Data
public class FormKeyValueDto extends KeyValueDto {
    private String type;
    private String fileName;
    private String filePath;
    private String fileUrl;
    private String fileId;

    @Override
    @Transient
    public boolean isNotIgnore() {
        if (!getUsing()) {
            return false;
        }
        return StringUtils.isNotEmpty(getKey()) || StringUtils.isNotEmpty(getFilePath());
    }
}
