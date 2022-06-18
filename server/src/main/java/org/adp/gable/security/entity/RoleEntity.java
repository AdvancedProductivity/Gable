package org.adp.gable.security.entity;

import lombok.Data;
import org.adp.gable.common.entity.BaseEntity;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

/**
 * @author zzq
 */
@Data
@Entity(name = "sec_role")
@org.hibernate.annotations.Table(appliesTo = "sec_role", comment = "role table, 角色表")
@javax.persistence.Table(name = "sec_role", indexes = {
        @Index(name = "idx_role_dateCreated", columnList = "date_created", unique = false),
        @Index(name = "idx_role_name", columnList = "name", unique = true)
})
public class RoleEntity extends BaseEntity {

    @Id
    @SequenceGenerator(
            name = "role_sequence"
            , sequenceName = "role_sequence"
            , allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "role_sequence"
    )
    private Long id;


    @Column(
            name = "name",
            columnDefinition = "varchar(16)",
            nullable = false
    )
    @Comment("role's name")
    private String name;


    @Column(
            name = "admin_user",
            columnDefinition = "bool default false",
            nullable = true
    )
    @Comment("role type is admin user. 角色类型，0是超级角色，不可以更改")
    private Boolean adminRole;

    @Override
    public void initBeforeSave() {
        super.initBeforeSave();
        this.adminRole = Boolean.FALSE;
    }

    @Override
    public void initBeforeUpdate() {
        super.initBeforeUpdate();
        this.adminRole = Boolean.FALSE;
    }
}
