package org.adp.gable.api.entity;

import lombok.Data;
import org.adp.gable.common.entity.BaseEntity;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

/**
 * @author zzq
 */
@Data
@Entity(name = "doc")
@org.hibernate.annotations.Table(appliesTo = "doc", comment = "doc table.文档表")
@javax.persistence.Table(name = "doc", indexes = {
        @Index(name = "idx_doc_dateCreated", columnList = "date_created", unique = false),
        @Index(name = "idx_doc_name", columnList = "name", unique = false)
})
public class DocEntity extends BaseEntity {

    @Id
    @SequenceGenerator(
            name = "api_doc_sequence"
            , sequenceName = "api_doc_sequence"
            , allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "api_doc_sequence"
    )
    private Long id;

    @Column(
            name = "name",
            columnDefinition = "varchar(128)",
            nullable = false
    )
    @Comment("doc name")
    private String name;
}
