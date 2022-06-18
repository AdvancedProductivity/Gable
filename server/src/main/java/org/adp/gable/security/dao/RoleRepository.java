package org.adp.gable.security.dao;

import org.adp.gable.security.entity.RoleEntity;
import org.adp.gable.security.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author zzq
 */
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

    /**
     * get all roles by user's id
     *
     * @param userId
     * @return role collections
     */
    @Query(value = "SELECT sr.* FROM sec_role_user_relation srur left join sec_role sr on sr.id = srur.role_id where user_id = ?1", nativeQuery = true)
    List<RoleEntity> getRoleByUserId(Long userId);


}
