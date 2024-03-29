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

    /**
     * find all sub menu by parent id
     *
     * @param parentId menu id
     * @return submenu list
     */
    List<DocMenu> findByParentIdOrderById(Long parentId);

    /**
     * get menu by api key. for api auto generated
     *
     * @param apiKey generated by id + apiType
     * @return menu
     */
    DocMenu findFirstByApiKey(String apiKey);

}
