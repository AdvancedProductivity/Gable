package org.adp.gable.api.dto.http;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

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
    public boolean isNotIgnore() {
        if (!getUsing()) {
            return false;
        }
        return StringUtils.isNotEmpty(getKey()) || StringUtils.isNotEmpty(getFilePath());
    }
}
