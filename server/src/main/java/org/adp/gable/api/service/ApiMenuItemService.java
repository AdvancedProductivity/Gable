package org.adp.gable.api.service;

import lombok.extern.slf4j.Slf4j;
import org.adp.gable.api.dao.ApiMenuItemDao;
import org.adp.gable.api.entity.ApiCollection;
import org.adp.gable.api.entity.ApiMenuItem;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 16943
 */
@Service
@Slf4j
public class ApiMenuItemService {

    @Resource
    private ApiMenuItemDao apiMenuItemDao;

    public List<ApiMenuItem> listAll(){
        return this.apiMenuItemDao.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public ApiMenuItem getById(Long id) {
        if (id == null) {
            return null;
        }
        return this.apiMenuItemDao.findById(id).orElse(null);
    }

    public Long updateTag(ApiMenuItem item) {
        ApiMenuItem data = this.apiMenuItemDao.findById(item.getId()).orElse(null);
        if (data != null) {
            log.info("old tag is:{} new tag is: {}", data.getTag(), item.getTag());
            log.info("old version is:{} new version is: {}", data.getVersion(), item.getVersion());
            data.setTag(item.getTag());
            data.setVersion(item.getVersion());
            this.apiMenuItemDao.saveAndFlush(data);
            return data.getId();
        }
        return item.getId();
    }

    public void rename(Long id, String newName) {
        ApiMenuItem data = this.apiMenuItemDao.findById(id).orElse(null);
        if (data != null) {
            data.setName(newName);
            this.apiMenuItemDao.saveAndFlush(data);
        }
    }

    public Long addItem(ApiMenuItem item) {
        item.setId(null);
        final ApiMenuItem save = this.apiMenuItemDao.save(item);
        log.info("add menu item: {}", save);
        return save.getId();
    }
}
