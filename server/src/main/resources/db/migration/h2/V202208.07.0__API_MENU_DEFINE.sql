drop table if exists api_collection;
create table api_collection
(
    id            bigint                   not null,
    created_by    bigint      default null not null,
    data_from     varchar(32) default null,
    date_created  timestamp   default null,
    date_modified timestamp   default null,
    modified_by   bigint      default null,
    operation_url varchar(64) default null,
    tenant_id     bigint      default 0    not null,
    api_count     bigint      default null,
    name          varchar(64)              not null,
    type          varchar(64),
    primary key (id)
);
drop index if exists idx_collection_dateCreated;
drop index if exists idx_collection_name;
create index idx_collection_dateCreated on api_collection (date_created);
create index idx_collection_name on api_collection (name);
drop sequence if exists collection_sequence;
create sequence collection_sequence start with 1 increment by 1;
drop table if exists API_HTTP;
create table api_http
(
    id                  bigint                   not null,
    created_by          bigint      default null not null,
    data_from           varchar(32) default null,
    date_created        timestamp   default null,
    date_modified       timestamp   default null,
    modified_by         bigint      default null,
    operation_url       varchar(64) default null,
    tenant_id           bigint      default 0    not null,
    body_form           text,
    body_graph_ql_query text,
    body_graph_ql_data  text,
    body_text           text,
    body_text_type      varchar(12),
    body_type           varchar(12),
    body_url_encoded    text,
    header              text,
    host                varchar(64)              not null,
    host_arr            text                     not null,
    method              varchar(32)              not null,
    path                varchar(512),
    path_array          text,
    port                varchar(16)              not null,
    protocol            varchar(10)              not null,
    query               text,
    url                 text,
    version             bigint      default null,
    primary key (id)
);
drop table if exists api_menu_item;
create table api_menu_item
(
    id            bigint                   not null,
    created_by    bigint      default null not null,
    data_from     varchar(32) default null,
    date_created  timestamp   default null,
    date_modified timestamp   default null,
    modified_by   bigint      default null,
    operation_url varchar(64) default null,
    tenant_id     bigint      default 0    not null,
    collection_id bigint      default null,
    define_id     bigint      default null,
    name          varchar(64)              not null,
    tag           varchar(64),
    type          varchar(64),
    api_version   bigint      default null,
    primary key (id)
);
drop index if exists idx_collection_name;
drop index if exists idx_api_http_dateCreated;
drop index if exists idx_api_menu_item_dateCreated;
drop index if exists idx_api_menu_item_name;
drop index if exists api_http_sequence;
drop index if exists api_menu_item_sequence;

create index idx_collection_name on api_collection (name);
create index idx_api_http_dateCreated on api_http (date_created);
create index idx_api_menu_item_dateCreated on api_menu_item (date_created);
create index idx_api_menu_item_name on api_menu_item (name);
drop sequence if exists api_http_sequence;
drop sequence if exists api_menu_item_sequence;
create sequence api_http_sequence start with 1 increment by 1;
create sequence api_menu_item_sequence start with 1 increment by 1;
