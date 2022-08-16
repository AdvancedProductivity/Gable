package org.adp.gable.api.controller;

import lombok.extern.slf4j.Slf4j;
import org.adp.gable.api.dto.doc.DocBlockDto;
import org.adp.gable.api.dto.doc.DocDefineDto;
import org.adp.gable.api.dto.doc.DocDto;
import org.adp.gable.api.dto.doc.DocMenuDto;
import org.adp.gable.api.entity.DocMenu;
import org.adp.gable.api.service.DocService;
import org.adp.gable.common.beans.Result;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zzq
 */
@RestController
@RequestMapping("/api/doc")
@Slf4j
public class DocController {

    @Resource
    private DocService docService;

    @PostMapping
    public Result<Long> addDoc(@RequestBody DocDto docDto) {
        return Result.success(docService.addDoc(docDto).getId());
    }

    @GetMapping
    public Result<List<DocDto>> listDoc() {
        return Result.success(docService.listDoc());
    }

    @GetMapping("/menu")
    public Result<List<DocMenuDto>> getDocMenuBaseLevel(@RequestParam Long docId, @RequestParam Integer level) {
        return Result.success(docService.getDocMenuBaseLevel(docId, level));
    }

    @PostMapping("/menu")
    public Result<Long> addDocMenu(@RequestBody DocMenuDto docMenuDto) {
        return Result.success(docService.addDocMenu(docMenuDto).getId());
    }

    @PostMapping("/docDefine")
    public Result<Long> addDocDefine(@RequestBody DocDefineDto docDefineDto) {
        return Result.success(docService.addDocDefine(docDefineDto).getId());
    }

    @GetMapping("/newCount")
    public Result<Long> updateMenuCount(@RequestParam Long id, @RequestParam Integer newCount) {
        DocMenu docMenu = docService.updateMenuCount(id, newCount);
        if (docMenu == null) {
            return Result.success(0L);
        }
        return Result.success(docMenu.getId());
    }

    @GetMapping("/subMenu")
    public Result<List<DocMenuDto>> getSubMenu(@RequestParam Long parentId) {
        return Result.success(docService.getSubMenu(parentId));
    }

    @GetMapping("/blocks")
    public Result<List<DocBlockDto>> getBlocksByDocId(@RequestParam Long docDefineId) {
        return Result.success(docService.getBlocksByDocId(docDefineId));
    }

    @PostMapping("/blocks")
    public Result<List<DocBlockDto>> updateOrCreateBlock(@RequestBody DocDefineDto dto) {
        docService.updateOrCreateBlock(dto);
        return Result.success(dto.getBlocks());
    }

    @GetMapping("/define")
    public Result<DocDefineDto> getDocDefine(@RequestParam Long id) {
        return Result.success(docService.getDocDefine(id));
    }

    @PostMapping("/menuRename")
    public Result<Long> updateDocMenuName(
            @RequestParam Long id,
            @RequestParam String newName
    ) {
        return Result.success(docService.updateDocMenuName(id, newName));
    }

}
