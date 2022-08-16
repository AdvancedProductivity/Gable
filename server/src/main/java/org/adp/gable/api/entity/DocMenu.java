package org.adp.gable.api.entity;

import lombok.Data;
import org.adp.gable.common.entity.BaseEntity;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

/**
 * @author zzq
 */
@Data
@Entity(name = "doc_menu")
@org.hibernate.annotations.Table(appliesTo = "doc_menu", comment = "doc menu table.文档目录表")
@javax.persistence.Table(name = "doc_menu", indexes = {
        @Index(name = "idx_doc_menu_dateCreated", columnList = "date_created", unique = false),
        @Index(name = "idx_doc_menu_level_doc", columnList = "level,doc_id", unique = false),
        @Index(name = "idx_doc_menu_parent", columnList = "parent_id", unique = false),
        @Index(name = "idx_doc_menu_name", columnList = "name", unique = false)
})
public class DocMenu extends BaseEntity {

    @Id
    @SequenceGenerator(
            name = "api_doc_menu_sequence"
            , sequenceName = "api_doc_menu_sequence"
            , allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "api_doc_menu_sequence"
    )
    private Long id;

    @Column(
            name = "name",
            columnDefinition = "varchar(128)",
            nullable = false
    )
    @Comment("doc menu name")
    private String name;

    @Column(
            name = "doc_id",
            columnDefinition = "bigint default null",
            nullable = true
    )
    @Comment("doc table id")
    private Long docId;

    @Column(
            name = "level",
            columnDefinition = "integer default null",
            nullable = true
    )
    @Comment("tree level")
    private Integer level;

    @Column(
            name = "item_count",
            columnDefinition = "integer default null",
            nullable = true
    )
    @Comment("children menu count")
    private Integer itemCount;

    @Column(
            name = "parent_id",
            columnDefinition = "bigint default null",
            nullable = true
    )
    @Comment("parent menu id")
    private Long parentId;

    @Column(
            name = "api_key",
            columnDefinition = "varchar(128)",
            nullable = false
    )
    @Comment("about api location")
    private String apiKey;
}
