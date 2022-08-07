package org.adp.gable.api.entity;

import lombok.Data;
import org.adp.gable.common.entity.BaseEntity;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

/**
 * @author zzq
 */
@Data
@Entity(name = "api_menu_item")
@org.hibernate.annotations.Table(appliesTo = "api_menu_item", comment = "api menu in tree. api菜单表")
@javax.persistence.Table(name = "api_menu_item", indexes = {
        @Index(name = "idx_api_menu_item_dateCreated", columnList = "date_created", unique = false),
        @Index(name = "idx_api_menu_item_name", columnList = "name", unique = false)
})
public class ApiMenuItem extends BaseEntity {

    @Id
    @SequenceGenerator(
            name = "api_menu_item_sequence"
            , sequenceName = "api_menu_item_sequence"
            , allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "api_menu_item_sequence"
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
            name = "tag",
            columnDefinition = "varchar(64)",
            nullable = true
    )
    @Comment("menu tag")
    private String tag;


    @Column(
            name = "define_id",
            columnDefinition = "bigint default null",
            nullable = true
    )
    @Comment("api define table id")
    private Long defineId;


    @Column(
            name = "api_version",
            columnDefinition = "bigint default null",
            nullable = true
    )
    @Comment("api menu version.is also api define table version")
    private Long version;


    @Column(
            name = "collection_id",
            columnDefinition = "bigint default null",
            nullable = true
    )
    @Comment("which collection belong to")
    private Long collectionId;
}
