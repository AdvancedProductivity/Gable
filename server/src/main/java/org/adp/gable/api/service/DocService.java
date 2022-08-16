package org.adp.gable.api.service;

import org.adp.gable.api.dao.DocDao;
import org.adp.gable.api.dto.doc.DocDto;
import org.adp.gable.api.entity.DocEntity;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Administrator
 */
@Service
public class DocService {

    @Resource
    private DocDao docDao;

    public DocEntity addDoc(DocDto docDto) {
        DocEntity docEntity = new DocEntity();
        docEntity.setName(docDto.getName());
        return this.docDao.save(docEntity);
    }

    public List<DocDto> listDoc() {
        List<DocEntity> all = this.docDao.findAll(
                Sort.by(Sort.Direction.ASC, "id")
        );
        List<DocDto> l = new ArrayList<>(all.size());
        for (DocEntity docEntity : all) {
            DocDto dto = new DocDto();
            BeanUtils.copyProperties(docEntity, dto);
            l.add(dto);
        }
        return l;
    }
}
