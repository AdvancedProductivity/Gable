package org.adp.gable.api.dao;

import org.adp.gable.api.entity.DocEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author zzq
 */
public interface DocDao extends JpaRepository<DocEntity,Long> {
}
