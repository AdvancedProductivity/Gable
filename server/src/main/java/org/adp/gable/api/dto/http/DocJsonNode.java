package org.adp.gable.api.dto.http;

import lombok.Data;

import java.util.Collections;
import java.util.List;

@Data
public class DocJsonNode {
    private String id;
    private Boolean canDelete;
    private Boolean canEditName;
    private Integer level;
    private String name;
    private String type;
    private String desc;
    private List<DocJsonNode> children;

    public static DocJsonNode getRoot() {
        DocJsonNode root= new DocJsonNode();
        root.canDelete = false;
        root.type = "'object'";
        root.children = Collections.emptyList();
        root.canEditName = false;
        root.level = 0;
        root.name = "root";
        return root;
    }
}
