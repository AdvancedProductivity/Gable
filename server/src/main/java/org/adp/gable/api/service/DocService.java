package org.adp.gable.api.service;

import lombok.extern.slf4j.Slf4j;
import org.adp.gable.api.dao.DocDao;
import org.adp.gable.api.dao.DocDefineDao;
import org.adp.gable.api.dao.DocMenuDao;
import org.adp.gable.api.dto.doc.DocDefineDto;
import org.adp.gable.api.dto.doc.DocDto;
import org.adp.gable.api.dto.doc.DocMenuDto;
import org.adp.gable.api.entity.DocDefine;
import org.adp.gable.api.entity.DocEntity;
import org.adp.gable.api.entity.DocMenu;
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
@Slf4j
public class DocService {

    @Resource
    private DocDao docDao;

    @Resource
    private DocMenuDao docMenuDao;

    @Resource
    private DocDefineDao docDefineDao;

    public DocEntity addDoc(DocDto docDto) {
        DocEntity docEntity = new DocEntity();
        docEntity.setName(docDto.getName());
        return this.docDao.save(docEntity);
    }

    public DocMenu addDocMenu(DocMenuDto docMenuDto) {
        DocMenu docMenu = new DocMenu();
        BeanUtils.copyProperties(docMenuDto, docMenu);
        return this.docMenuDao.save(docMenu);
    }

    public DocDefine addDocDefine(DocDefineDto docDefineDto) {
        DocDefine docDefine = new DocDefine();
        BeanUtils.copyProperties(docDefineDto, docDefine);
        return this.docDefineDao.save(docDefine);
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

    public List<DocMenuDto> getDocMenuBaseLevel(Long docId, Integer level) {
        List<DocMenu> all = this.docMenuDao.findByDocIdAndLevelOrderById(docId, level);
        List<DocMenuDto> l = new ArrayList<>(all.size());
        for (DocMenu menuItem : all) {
            DocMenuDto dto = new DocMenuDto();
            BeanUtils.copyProperties(menuItem, dto);
            l.add(dto);
        }
        return l;
    }

    public List<DocMenuDto> getSubMenu(Long parentId) {
        List<DocMenu> all = this.docMenuDao.findByParentIdOrderById(parentId);
        List<DocMenuDto> l = new ArrayList<>(all.size());
        for (DocMenu menuItem : all) {
            DocMenuDto dto = new DocMenuDto();
            BeanUtils.copyProperties(menuItem, dto);
            l.add(dto);
        }
        return l;
    }

    public DocMenu updateMenuCount(Long id, Integer newCount) {
        DocMenu data = this.docMenuDao.findById(id).orElse(null);
        if (data != null) {
            log.info("{} {}’s sub menu count become:{}", id, data.getName(), newCount);
            data.setItemCount(newCount);
            this.docMenuDao.saveAndFlush(data);
        }
        return data;
    }
}
