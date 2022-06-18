package org.adp.gable.security.entity;

import lombok.Data;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

/**
 * @author zzq
 */

@Data
@Entity(name = "sec_role_permission_relation")
@org.hibernate.annotations.Table(appliesTo = "sec_role_permission_relation", comment = "role permission relation table, 角色权限关系表")
@javax.persistence.Table(name = "sec_role_permission_relation", indexes = {
        @Index(name = "idx_srpr_name", columnList = "role_id,permission_code", unique = true)
})
public class RolePermissionRelation {


    @Id
    @SequenceGenerator(
            name = "role_perm_relation_sequence"
            , sequenceName = "role_perm_relation_sequence"
            , allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "role_perm_relation_sequence"
    )
    private Long id;

    @Comment("role’s id.  角色id")
    @Column(
            name = "role_id",
            unique = false,
            columnDefinition = "bigint default null",
            nullable = false
    )
    private Long roleId;

    @Comment("permission code(define in enum class).  权限代码(定义在枚举类中)")
    @Column(
            name = "permission_code",
            unique = false,
            columnDefinition = "varchar(16) default null",
            nullable = false
    )
    private String permissionCode;
}
