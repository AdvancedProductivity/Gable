package org.adp.gable.security.entity;

import lombok.Data;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

/**
 * @author zzq
 */
@Data
@Entity(name = "sec_role_user_relation")
@org.hibernate.annotations.Table(appliesTo = "sec_role_user_relation", comment = "role user relation table, 用户角色关系表")
@javax.persistence.Table(name = "sec_role_user_relation", indexes = {
        @Index(name = "idx_srur_name", columnList = "role_id,user_id", unique = true)
})
public class RoleUserRelation {
    @Id
    @SequenceGenerator(
            name = "role_user_relation_sequence"
            , sequenceName = "role_user_relation_sequence"
            , allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "role_user_relation_sequence"
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

    @Comment("user’s id.  用户id")
    @Column(
            name = "user_id",
            unique = false,
            columnDefinition = "bigint default null",
            nullable = false
    )
    private Long userId;
}
