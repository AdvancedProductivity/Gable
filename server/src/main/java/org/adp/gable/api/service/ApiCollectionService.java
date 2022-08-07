package org.adp.gable.api.service;

import lombok.extern.slf4j.Slf4j;
import org.adp.gable.api.dao.ApiCollectionDao;
import org.adp.gable.api.entity.ApiCollection;
import org.adp.gable.common.beans.Result;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zzq
 */
@Service
@Slf4j
public class ApiCollectionService {

    @Resource
    private ApiCollectionDao apiCollectionDao;

    public Long addCollection(ApiCollection collection) {
        collection.setId(null);
        collection.setApiCount(0L);
        final ApiCollection save = this.apiCollectionDao.save(collection);
        log.info("add collection: {}", save);
        return save.getId();
    }

    public void rename(Long id, String newName) {
        ApiCollection data = this.apiCollectionDao.findById(id).orElse(null);
        if (data != null) {
            data.setName(newName);
            this.apiCollectionDao.saveAndFlush(data);
        }
    }


    public ApiCollection getById(Long id) {
        if (id == null) {
            return null;
        }
        return apiCollectionDao.findById(id).orElse(null);
    }

    public List<ApiCollection> listAll() {
        return this.apiCollectionDao.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

}
