package org.adp.gable.api.entity;

import lombok.Data;
import org.adp.gable.common.entity.BaseEntity;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

/**
 * @author zzq
 */
@Data
@Entity(name = "api_collection")
@org.hibernate.annotations.Table(appliesTo = "api_collection", comment = "api collection table. api集合表")
@javax.persistence.Table(name = "api_collection", indexes = {
        @Index(name = "idx_collection_dateCreated", columnList = "date_created", unique = false),
        @Index(name = "idx_collection_name", columnList = "name", unique = false)
})
public class ApiCollection extends BaseEntity {

    @Id
    @SequenceGenerator(
            name = "collection_sequence"
            , sequenceName = "collection_sequence"
            , allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "collection_sequence"
    )
    private Long id;


    @Column(
            name = "name",
            columnDefinition = "varchar(64)",
            nullable = false
    )
    @Comment("collection name")
    private String name;


    @Column(
            name = "type",
            columnDefinition = "varchar(64)",
            nullable = true
    )
    @Comment("collection type")
    private String type;


    @Column(
            name = "api_count",
            columnDefinition = "bigint default null",
            nullable = true
    )
    @Comment("api count belong this collection")
    private String apiCount;

}
