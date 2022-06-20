package org.adp.gable.security.dao;

import org.adp.gable.security.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author zzq
 */
public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
