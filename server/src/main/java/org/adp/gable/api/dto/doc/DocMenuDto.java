package org.adp.gable.api.dto.doc;

import lombok.Data;

/**
 * @author zzq
 */
@Data
public class DocMenuDto {
    private Long id;
    private String name;
    private Long docId;
    private Integer level;
    private Integer itemCount;
    private Long parentId;
    private String apiKey;
}
