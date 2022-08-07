package org.adp.gable.api.service;

import lombok.extern.slf4j.Slf4j;
import org.adp.gable.api.dao.HttpApiDao;
import org.adp.gable.api.entity.ApiCollection;
import org.adp.gable.api.entity.HttpApi;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zzq
 */
@Service
@Slf4j
public class HttpApiService {
    @Resource
    private HttpApiDao httpApiDao;

    public Long addHttp(HttpApi api) {
        final HttpApi save = this.httpApiDao.save(api);
        return save.getId();
    }

    public Long updateDefine(Long id, HttpApi waitForSave) {
        HttpApi data = this.httpApiDao.findById(id).orElse(null);
        if (data != null) {
            log.info("old version: {}", data.getVersion());
            log.info("new version: {}", waitForSave.getVersion());
            BeanUtils.copyProperties(waitForSave, data, org.adp.gable.utils.BeanUtils.getNullPropertyNames(waitForSave));
            this.httpApiDao.saveAndFlush(data);
            return data.getId();
        }
        return null;
    }

    public HttpApi getOneById(Long id) {
        if (id == null) {
            return null;
        }
        return this.httpApiDao.findById(id).orElse(null);
    }
}
