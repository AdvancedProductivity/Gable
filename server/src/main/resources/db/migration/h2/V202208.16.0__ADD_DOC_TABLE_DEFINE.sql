create table doc
(
    id            bigint                   not null,
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
create table doc_block
(
    i             bigint                   not null,
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
create table doc_define
(
    id            bigint                   not null,
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

create table doc_menu
(
    id            bigint                   not null,
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

create index idx_doc_dateCreated on doc (date_created);
create index idx_doc_name on doc (name);
create index idx_doc_block_dateCreated on doc_block (date_created);
create index idx_doc_block_docDefineId on doc_block (doc_define_id);
create index idx_doc_define_dateCreated on doc_define (date_created);
create index idx_doc_define_name on doc_define (name);
create index idx_doc_menu_dateCreated on doc_menu (date_created);
create index idx_doc_menu_level_doc on doc_menu (level, doc_id);
create index idx_doc_menu_parent on doc_menu (parent_id);
create index idx_doc_menu_name on doc_menu (name);

create sequence api_doc_menu_sequence start with 1 increment by 1;
create sequence api_doc_sequence start with 1 increment by 1;
create sequence doc_block_sequence start with 1 increment by 1;
create sequence doc_define_sequence start with 1 increment by 1;

INSERT into doc (id, created_by, data_from, date_created, date_modified, modified_by, operation_url, tenant_id, name)
VALUES (
        (select nextval ('api_doc_sequence')),
        0,
        'app',
        current_timestamp,
        current_timestamp,
        0,
        '',
        0,
        'Default'
        );
