package org.adp.gable.common.entity;

import lombok.Data;
import org.adp.gable.security.dtos.UserDto;
import org.hibernate.annotations.Comment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;

/**
 * @author zzq
 */
@MappedSuperclass
@Data
public class BaseEntity {

    @Comment("tenant id.ready for multi-tenancy.Probably not. 租户Id,为多租户做准备，有可能用不到")
    @Column(
            name = "tenant_id",
            unique = false,
            columnDefinition = "bigint default 0",
            nullable = false
    )
    private Long tenantId;

    @Comment("Record who created this data.  记录谁创建了数据")
    @Column(
            name = "created_by",
            unique = false,
            columnDefinition = "bigint default null",
            nullable = false
    )
    private Long createdBy;

    @Comment("the record created date-time,only set on date created.  数据的创建时间，只会在数据创建的时候被赋值")
    @Column(
            name = "date_created",
            unique = false,
            columnDefinition = "timestamp default null",
            nullable = true
    )
    private Date dateCreated;

    @Comment("Record who modified this data.  记录谁修改了数据")
    @Column(
            name = "modified_by",
            unique = false,
            columnDefinition = "bigint default null",
            nullable = true
    )
    private Long modifiedBy;

    @Comment("the record updated date-time,will be modified on data update.  数据的更新时间，会在数据更新时")
    @Column(
            name = "date_modified",
            unique = false,
            columnDefinition = "timestamp default null",
            nullable = true
    )
    private Date dateModified;

    @Comment("Record the URL to create or modify this data.  记录创建这条数据或者修改这条数据的url")
    @Column(
            name = "operation_url",
            unique = false,
            columnDefinition = "varchar(64) default null",
            nullable = true
    )
    private String operationUrl;

    @Comment("Record the data source, and the value comes from the agreement of the business layer  记录数据来源,值来自业务层的约定")
    @Column(
            name = "data_from",
            unique = false,
            columnDefinition = "varchar(32) default null",
            nullable = true
    )
    private String dataFrom;

    @PrePersist
    public void initBeforeSave(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        this.dateCreated = new Date();
        this.dateModified = this.dateCreated;
        if (authentication == null) {
            this.createdBy = 0L;
            this.modifiedBy = this.createdBy;
            this.tenantId = 0L;
        }else {
            final UserDto userDto = (UserDto) authentication.getPrincipal();
            this.createdBy = userDto.getId();
            this.modifiedBy = this.createdBy;
            this.tenantId = userDto.getTenantId();
        }
        final RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (requestAttributes != null) {
            this.operationUrl = ((ServletRequestAttributes) requestAttributes).getRequest().getRequestURI();
        }
    }

    @PreUpdate
    public void initBeforeUpdate(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        this.dateModified = new Date();
        if (authentication == null) {
            this.modifiedBy = 0L;
        } else {
            final Object principal = authentication.getPrincipal();
            final UserDto userDto = (UserDto) authentication.getPrincipal();
            this.modifiedBy = userDto.getId();
        }
        final RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (requestAttributes != null) {
            this.operationUrl = ((ServletRequestAttributes) requestAttributes).getRequest().getRequestURI();
        }
    }
}
