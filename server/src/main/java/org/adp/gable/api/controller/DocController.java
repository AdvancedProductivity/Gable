package org.adp.gable.api.controller;

import lombok.extern.slf4j.Slf4j;
import org.adp.gable.api.dto.doc.DocDto;
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
}
