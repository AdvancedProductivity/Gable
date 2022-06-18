package org.adp.gable.security.dao;

import org.adp.gable.security.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author zzq
 */
public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
