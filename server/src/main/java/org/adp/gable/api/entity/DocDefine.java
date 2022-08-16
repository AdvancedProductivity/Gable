package org.adp.gable.api.entity;

import lombok.Data;
import org.adp.gable.common.entity.BaseEntity;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

/**
 * @author zzq
 */
@Data
@Entity(name = "doc_define")
@org.hibernate.annotations.Table(appliesTo = "doc_define", comment = "doc table.文档表")
@javax.persistence.Table(name = "doc_define", indexes = {
        @Index(name = "idx_doc_define_dateCreated", columnList = "date_created", unique = false),
        @Index(name = "idx_doc_define_name", columnList = "name", unique = false)
})
public class DocDefine extends BaseEntity {

    @Id
    @SequenceGenerator(
            name = "doc_define_sequence"
            , sequenceName = "doc_define_sequence"
            , allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "doc_define_sequence"
    )
    private Long id;

    @Column(
            name = "name",
            columnDefinition = "varchar(128)",
            nullable = false
    )
    @Comment("doc title")
    private String name;

    @Column(
            name = "version",
            columnDefinition = "varchar(32)",
            nullable = true
    )
    @Comment("editor version")
    private String version;

    @Column(
            name = "time",
            columnDefinition = "bigint default null",
            nullable = true
    )
    @Comment("edit time")
    private Long time;
}
