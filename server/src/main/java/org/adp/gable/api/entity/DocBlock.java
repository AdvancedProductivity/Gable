package org.adp.gable.api.entity;

import lombok.Data;
import org.adp.gable.common.entity.BaseEntity;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

@Data
@Entity(name = "doc_block")
@org.hibernate.annotations.Table(appliesTo = "doc_block", comment = "doc block.文档块表")
@javax.persistence.Table(name = "doc_block", indexes = {
        @Index(name = "idx_doc_block_dateCreated", columnList = "date_created", unique = false),
        @Index(name = "idx_doc_block_docDefineId", columnList = "doc_define_id", unique = false)
})
public class DocBlock extends BaseEntity {

    @Id
    @SequenceGenerator(
            name = "doc_block_sequence"
            , sequenceName = "doc_block_sequence"
            , allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "doc_block_sequence"
    )
    @Column(name = "i")
    private Long i;

    @Column(
            name = "id",
            columnDefinition = "varchar(32)",
            nullable = true
    )
    @Comment("generate by editor")
    private String id;


    @Column(
            name = "doc_define_id",
            columnDefinition = "bigint default null",
            nullable = true
    )
    @Comment("doc define table")
    private Long docDefineId;

    @Column(
            name = "block_order",
            columnDefinition = "integer default null",
            nullable = true
    )
    @Comment("order for sort")
    private Integer order;

    @Column(
            name = "type",
            columnDefinition = "varchar(32)",
            nullable = true
    )
    @Comment("block type")
    private String type;

    @Column(
            name = "data",
            columnDefinition = "text",
            nullable = true
    )
    @Comment("block detail")
    private String data;


    @Column(
            name = "config",
            columnDefinition = "text",
            nullable = true
    )
    @Comment("config detail")
    private String config;
}
