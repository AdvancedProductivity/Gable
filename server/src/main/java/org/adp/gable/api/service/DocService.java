package org.adp.gable.api.service;

import lombok.extern.slf4j.Slf4j;
import org.adp.gable.api.dao.DocBlockDao;
import org.adp.gable.api.dao.DocDao;
import org.adp.gable.api.dao.DocDefineDao;
import org.adp.gable.api.dao.DocMenuDao;
import org.adp.gable.api.dto.doc.DocBlockDto;
import org.adp.gable.api.dto.doc.DocDefineDto;
import org.adp.gable.api.dto.doc.DocDto;
import org.adp.gable.api.dto.doc.DocMenuDto;
import org.adp.gable.api.entity.DocBlock;
import org.adp.gable.api.entity.DocDefine;
import org.adp.gable.api.entity.DocEntity;
import org.adp.gable.api.entity.DocMenu;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
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

    @Resource
    private DocBlockDao docBlockDao;

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

    public DocDto getOneById(Long id) {
        final DocEntity docEntity = this.docDao.findById(id).orElse(null);
        if (docEntity == null) {
            return null;
        }
        DocDto dto = new DocDto();
        BeanUtils.copyProperties(docEntity, dto);
        return dto;
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

    public List<DocBlockDto> getBlocksByDocId(Long docDefineId) {
        List<DocBlock> all = this.docBlockDao.findByDocDefineIdOrderByOrder(docDefineId);
        if (CollectionUtils.isEmpty(all)) {
            return Collections.emptyList();
        }
        List<DocBlockDto> arrays = new ArrayList<>(all.size());
        for (DocBlock block : all) {
            arrays.add(DocBlockDto.from(block));
        }
        return arrays;
    }

    public DocDefineDto getDocDefine(Long id) {
        DocDefine docDefine = this.docDefineDao.findById(id).orElse(null);
        if (docDefine == null) {
            return null;
        }
        DocDefineDto docDefineDto = new DocDefineDto();
        BeanUtils.copyProperties(docDefine, docDefineDto);
        return docDefineDto;
    }

    public Long updateDocMenuName(Long id, String newName) {
        DocMenu docMenu = this.docMenuDao.findById(id).orElse(null);
        if (docMenu != null) {
            docMenu.setName(newName);
            this.docMenuDao.saveAndFlush(docMenu);
        }
        return id;
    }

    @Transactional(rollbackOn = Exception.class)
    @Modifying
    public void updateOrCreateBlock(DocDefineDto dto) {
        // update define name
        DocDefine docDefine = this.docDefineDao.findById(dto.getId()).orElse(null);
        if (docDefine != null) {
            docDefine.setName(dto.getName());
            this.docDefineDao.saveAndFlush(docDefine);
        }
        // delete all blocks
        this.docBlockDao.deleteByDocDefineId(dto.getId());
        // restore all new block data
        List<DocBlockDto> blocks = dto.getBlocks();
        List<DocBlock> newBlocks = new ArrayList<>(blocks.size());
        for (DocBlockDto block : blocks) {
            newBlocks.add(block.translateToEntity());
        }
        this.docBlockDao.saveAll(newBlocks);
    }
}
