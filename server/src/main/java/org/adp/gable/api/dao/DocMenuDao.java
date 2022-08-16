package org.adp.gable.api.dao;

import org.adp.gable.api.entity.DocMenu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author zzq
 */
public interface DocMenuDao extends JpaRepository<DocMenu, Long> {

    /**
     * get a doc‘s menu by level
     * @param docId doc id
     * @param level menu level
     * @return menu list
     * */
    List<DocMenu> findByDocIdAndLevelOrderById(Long docId, Integer level);

    List<DocMenu> findByParentIdOrderById(Long parentId);
}
