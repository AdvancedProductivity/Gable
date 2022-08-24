package org.adp.gable.api.dto.http;

import lombok.Data;
import org.apache.commons.lang3.RandomStringUtils;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Data
public class DocJsonTableNode {
    private String id;
    private Boolean canDelete;
    private Boolean canEditName;
    private String name;
    private String type;
    private String desc;
    private Object sample;
    private List<String> location;

    public static List<DocJsonTableNode> getRoot() {
        DocJsonTableNode root = new DocJsonTableNode();
        root.id = RandomStringUtils.random(5, true, false);
        root.canDelete = false;
        root.type = "object";
        root.canEditName = false;
        root.name = "root";
        root.sample = "";
        root.location = Collections.singletonList(root.id);
        return Collections.singletonList(root);
    }

}
