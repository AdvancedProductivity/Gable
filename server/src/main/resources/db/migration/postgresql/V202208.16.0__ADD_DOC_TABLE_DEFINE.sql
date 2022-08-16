create table doc
(
    id            int8                     not null,
    created_by    bigint      default null not null,
    data_from     varchar(32) default null,
    date_created  timestamp   default null,
    date_modified timestamp   default null,
    modified_by   bigint      default null,
    operation_url varchar(64) default null,
    tenant_id     bigint      default 0    not null,
    name          varchar(128)             not null,
    primary key (id)
);
comment on table doc is 'doc table.文档表';
comment on column doc.created_by is 'Record who created this data.  记录谁创建了数据';
comment on column doc.data_from is 'Record the data source, and the value comes from the agreement of the business layer  记录数据来源,值来自业务层的约定';
comment on column doc.date_created is 'the record created date-time,only set on date created.  数据的创建时间，只会在数据创建的时候被赋值';
comment on column doc.date_modified is 'the record updated date-time,will be modified on data update.  数据的更新时间，会在数据更新时';
comment on column doc.modified_by is 'Record who modified this data.  记录谁修改了数据';
 comment on column doc.operation_url is 'Record the URL to create or modify this data.  记录创建这条数据或者修改这条数据的url';
comment on column doc.tenant_id is 'tenant id.ready for multi-tenancy.Probably not. 租户Id,为多租户做准备，有可能用不到';
comment on column doc.name is 'doc name';

create table doc_block
(
    i             int8                     not null,
    created_by    bigint      default null not null,
    data_from     varchar(32) default null,
    date_created  timestamp   default null,
    date_modified timestamp   default null,
    modified_by   bigint      default null,
    operation_url varchar(64) default null,
    tenant_id     bigint      default 0    not null,
    config        text,
    data          text,
    doc_define_id bigint      default null,
    id            varchar(32),
    block_order   integer     default null,
    type          varchar(32),
    primary key (i)
);
comment on table doc_block is 'doc block.文档块表';
comment on column doc_block.created_by is 'Record who created this data.  记录谁创建了数据';
comment on column doc_block.data_from is 'Record the data source, and the value comes from the agreement of the business layer  记录数据来源,值来自业务层的约定';
comment on column doc_block.date_created is 'the record created date-time,only set on date created.  数据的创建时间，只会在数据创建的时候被赋值';
comment on column doc_block.date_modified is 'the record updated date-time,will be modified on data update.  数据的更新时间，会在数据更新时';
comment on column doc_block.modified_by is 'Record who modified this data.  记录谁修改了数据';
comment on column doc_block.operation_url is 'Record the URL to create or modify this data.  记录创建这条数据或者修改这条数据的url';
comment on column doc_block.tenant_id is 'tenant id.ready for multi-tenancy.Probably not. 租户Id,为多租户做准备，有可能用不到';
comment on column doc_block.config is 'config detail';
comment on column doc_block.data is 'block detail';
comment on column doc_block.doc_define_id is 'doc define table';
comment on column doc_block.id is 'generate by editor';
comment on column doc_block.block_order is 'order for sort';
comment on column doc_block.type is 'block type';

create table doc_define
(
    id            int8                     not null,
    created_by    bigint      default null not null,
    data_from     varchar(32) default null,
    date_created  timestamp   default null,
    date_modified timestamp   default null,
    modified_by   bigint      default null,
    operation_url varchar(64) default null,
    tenant_id     bigint      default 0    not null,
    name          varchar(128)             not null,
    time          bigint      default null,
    version       varchar(32),
    primary key (id)
);
comment on table doc_define is 'doc table.文档表';
comment on column doc_define.created_by is 'Record who created this data.  记录谁创建了数据';
comment on column doc_define.data_from is 'Record the data source, and the value comes from the agreement of the business layer  记录数据来源,值来自业务层的约定';
comment on column doc_define.date_created is 'the record created date-time,only set on date created.  数据的创建时间，只会在数据创建的时候被赋值';
comment on column doc_define.date_modified is 'the record updated date-time,will be modified on data update.  数据的更新时间，会在数据更新时';
comment on column doc_define.modified_by is 'Record who modified this data.  记录谁修改了数据';
comment on column doc_define.operation_url is 'Record the URL to create or modify this data.  记录创建这条数据或者修改这条数据的url';
comment on column doc_define.tenant_id is 'tenant id.ready for multi-tenancy.Probably not. 租户Id,为多租户做准备，有可能用不到';
comment on column doc_define.name is 'doc title';
comment on column doc_define.time is 'edit time';
comment on column doc_define.version is 'editor version';

create table doc_menu
(
    id            int8                     not null,
    created_by    bigint      default null not null,
    data_from     varchar(32) default null,
    date_created  timestamp   default null,
    date_modified timestamp   default null,
    modified_by   bigint      default null,
    operation_url varchar(64) default null,
    tenant_id     bigint      default 0    not null,
    api_key       varchar(128)             not null,
    doc_id        bigint      default null,
    item_count    integer     default null,
    level         integer     default null,
    name          varchar(128)             not null,
    parent_id     bigint      default null,
    primary key (id)
);
comment on table doc_menu is 'doc menu table.文档目录表';
comment on column doc_menu.created_by is 'Record who created this data.  记录谁创建了数据';
comment on column doc_menu.data_from is 'Record the data source, and the value comes from the agreement of the business layer  记录数据来源,值来自业务层的约定';
comment on column doc_menu.date_created is 'the record created date-time,only set on date created.  数据的创建时间，只会在数据创建的时候被赋值';
comment on column doc_menu.date_modified is 'the record updated date-time,will be modified on data update.  数据的更新时间，会在数据更新时';
comment on column doc_menu.modified_by is 'Record who modified this data.  记录谁修改了数据';
comment on column doc_menu.operation_url is 'Record the URL to create or modify this data.  记录创建这条数据或者修改这条数据的url';
comment on column doc_menu.tenant_id is 'tenant id.ready for multi-tenancy.Probably not. 租户Id,为多租户做准备，有可能用不到';
comment on column doc_menu.api_key is 'about api location';
comment on column doc_menu.doc_id is 'doc table id';
comment on column doc_menu.item_count is 'children menu count';
comment on column doc_menu.level is 'tree level';
comment on column doc_menu.name is 'doc menu name';
comment on column doc_menu.parent_id is 'parent menu id';
create index idx_doc_dateCreated on doc (date_created);
create index idx_doc_name on doc (name);
create index idx_doc_block_dateCreated on doc_block (date_created);
create index idx_doc_block_docDefineId on doc_block (doc_define_id);
create index idx_doc_define_dateCreated on doc_define (date_created);
create index idx_doc_define_name on doc_define (name);
create index idx_doc_menu_dateCreated on doc_menu (date_created);
create index idx_doc_menu_name on doc_menu (name);
create index idx_doc_menu_level_doc on doc_menu (level, doc_id);
create index idx_doc_menu_parent on doc_menu (parent_id);
create sequence api_doc_menu_sequence start 1 increment 1;
create sequence api_doc_sequence start 1 increment 1;
create sequence doc_block_sequence start 1 increment 1;
create sequence doc_define_sequence start 1 increment 1;

INSERT into doc (id, created_by, data_from, date_created, date_modified, modified_by, operation_url, tenant_id, name)
VALUES (
        (select nextval ('api_doc_sequence')), 0, 'app',current_timestamp, current_timestamp,0,'',0, 'Default')
    ON CONFLICT (id) DO NOTHING;

