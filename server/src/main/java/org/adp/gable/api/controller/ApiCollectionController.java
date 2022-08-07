package org.adp.gable.api.controller;

import lombok.extern.slf4j.Slf4j;
import org.adp.gable.api.dto.HttpApiDto;
import org.adp.gable.api.dto.http.HttpDtoUtils;
import org.adp.gable.api.entity.ApiCollection;
import org.adp.gable.api.entity.ApiMenuItem;
import org.adp.gable.api.entity.HttpApi;
import org.adp.gable.api.service.ApiCollectionService;
import org.adp.gable.api.service.ApiMenuItemService;
import org.adp.gable.api.service.HttpApiService;
import org.adp.gable.common.beans.Result;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zzq
 */
@RestController
@RequestMapping("/api/collection")
@Slf4j
public class ApiCollectionController {

    @Resource
    private ApiCollectionService apiCollectionService;

    @Resource
    private ApiMenuItemService apiMenuItemService;

    @Resource
    private HttpApiService httpApiService;

    @PostMapping
    public Result<Long> addCollection(@RequestBody ApiCollection collection) {
        log.info("add collection: {}", collection);
        return Result.success(apiCollectionService.addCollection(collection));
    }

    @PostMapping("item")
    public Result<Long> addApiMenuItem(@RequestBody ApiMenuItem item) {
        log.info("add menu item: {}", item);
        return Result.success(this.apiMenuItemService.addItem(item));
    }

    @PutMapping("tag")
    public Result<Long> updateTag(@RequestBody ApiMenuItem item) {
        log.info("update menu tag to be {} for: {}", item.getTag(), item.getId());
        return Result.success(this.apiMenuItemService.updateTag(item));
    }

    @PostMapping("renameCollection")
    public Result<Long> renameCollection(@RequestBody ApiCollection collection) {
        log.info("collection: {} rename to be {}", collection.getId(), collection.getName());
        this.apiCollectionService.rename(collection.getId(), collection.getName());
        return Result.success(collection.getId());
    }

    @PostMapping("renameItem")
    public Result<Long> renameItem(@RequestBody ApiMenuItem item) {
        log.info("menu item: {} rename to be {}", item.getId(), item.getName());
        this.apiMenuItemService.rename(item.getId(), item.getName());
        return Result.success(item.getId());
    }

    @GetMapping
    public Result<ApiCollection> getOneById(@RequestParam Long id) {
        return Result.success(apiCollectionService.getById(id));
    }

    @GetMapping("item")
    public Result<ApiMenuItem> getOneItemById(@RequestParam Long id) {
        return Result.success(this.apiMenuItemService.getById(id));
    }

    @GetMapping("/all")
    public Result<List<ApiCollection>> getAll() {
        return Result.success(apiCollectionService.listAll());
    }

    @GetMapping("/allItems")
    public Result<List<ApiMenuItem>> getAllItem() {
        return Result.success(this.apiMenuItemService.listAll());
    }

    @PostMapping("http")
    public Result<Long> addHttp(@RequestBody HttpApiDto http) {
        log.info("add http: {}", http);
        final HttpApi waitForSave = HttpDtoUtils.transFromDtoToEntity(http);
        Long id = this.httpApiService.addHttp(waitForSave);
        return Result.success(id);
    }

    @PutMapping("http")
    public Result<Long> updateApi(@RequestParam Long id,@RequestBody HttpApiDto http) {
        log.info("update http: {}", http);
        final HttpApi waitForSave = HttpDtoUtils.transFromDtoToEntity(http);
        id = this.httpApiService.updateDefine(id, waitForSave);
        return Result.success(id);
    }
}
