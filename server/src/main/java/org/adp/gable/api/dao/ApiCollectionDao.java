package org.adp.gable.api.dao;

import org.adp.gable.api.entity.ApiCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author 16943
 */
@Repository
public interface ApiCollectionDao extends JpaRepository<ApiCollection, Long> {

}
