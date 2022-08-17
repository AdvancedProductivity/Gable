package org.adp.gable.api.dao;

import org.adp.gable.api.entity.DocBlock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author zzq
 */
public interface DocBlockDao extends JpaRepository<DocBlock, Long> {

    /**
     * get all blocks by doc define id
     *
     * @param docDefineId doc define id
     * @return doc blocks
     * */
    List<DocBlock> findByDocDefineIdOrderByOrder(Long docDefineId);


    /**
     * delete all blocks by doc define id
     *
     * @param docDefineId doc define id
     * @return delete count
     */
    int deleteByDocDefineId(Long docDefineId);


    /**
     * delete all blocks by doc define id
     *
     * @param order the max order remained
     * @param docDefineId doc define id
     * @return delete count
     */
    int deleteByDocDefineIdAndOrderGreaterThanEqual(Long docDefineId, Integer order);
}
