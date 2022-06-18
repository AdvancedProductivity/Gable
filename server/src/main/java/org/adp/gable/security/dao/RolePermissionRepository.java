package org.adp.gable.security.dao;

import org.adp.gable.security.entity.RoleEntity;
import org.adp.gable.security.entity.RolePermissionRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author zzq
 */
public interface RolePermissionRepository extends JpaRepository<RolePermissionRelation, Long> {

    /**
     * get all role’s permission code
     *
     * @param roleIds role collections
     * @return all permission code
     * */
    @Query(value = "SELECT srpr.permission_code FROM sec_role_permission_relation srpr left join sec_role sr on srpr.role_id = sr.id where sr.id IN ?1", nativeQuery = true)
    List<String> getPermissionsByRoleIds(List<Long> roleIds);

}
