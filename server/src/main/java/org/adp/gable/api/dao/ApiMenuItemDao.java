package org.adp.gable.api.dao;

import org.adp.gable.api.entity.ApiMenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author zzq
 */
public interface ApiMenuItemDao extends JpaRepository<ApiMenuItem, Long> {

    /**
     * get menu by api id
     *
     * @param defineId api id
     * @return menu
     */
    ApiMenuItem findFirstByDefineId(Long defineId);

    Integer countByCollectionId(Long collectionId);
}
