package org.adp.gable.api.dto.doc;

import lombok.Data;

import java.util.List;

/**
 * @author zzq
 */
@Data
public class DocDefineDto {
    private Long id;
    private String name;
    private String version;
    private Long time;
    private List<DocBlockDto> blocks;
}
