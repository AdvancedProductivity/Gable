package org.adp.gable.api.dto.doc;

import lombok.Data;

import java.util.Date;

/**
 * @author zzq
 */
@Data
public class DocDto {
    private Long id;
    private String name;
    private Date dateCreated;
}
