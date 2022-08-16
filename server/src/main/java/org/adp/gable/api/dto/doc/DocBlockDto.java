package org.adp.gable.api.dto.doc;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.adp.gable.api.entity.DocBlock;
import org.adp.gable.utils.JsonBuilderHolder;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

/**
 * @author zzq
 */
@Data
public class DocBlockDto {
    private Long i;
    private String id;
    private Long docDefineId;
    private Integer order;
    private String type;
    private JsonNode data;
    private JsonNode config;

    public DocBlock translateToEntity() {
        DocBlock block = new DocBlock();
        BeanUtils.copyProperties(this, block, "data", "config");
        if (this.data == null) {
            this.data = JsonBuilderHolder.OBJECT_MAPPER.createObjectNode();
        }
        if (this.config == null) {
            this.config = JsonBuilderHolder.OBJECT_MAPPER.createObjectNode();
        }
        block.setData(this.data.toString());
        block.setConfig(this.config.toString());
        return block;
    }

    public static DocBlockDto from(DocBlock block) {
        DocBlockDto dto = new DocBlockDto();
        BeanUtils.copyProperties(block, dto, "data", "config");
        try {
            if (StringUtils.isNotEmpty(block.getData())) {
                dto.setData(JsonBuilderHolder.OBJECT_MAPPER.readTree(block.getData()));
            }
            if (StringUtils.isNotEmpty(block.getConfig())) {
                dto.setData(JsonBuilderHolder.OBJECT_MAPPER.readTree(block.getConfig()));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dto;
    }
}
