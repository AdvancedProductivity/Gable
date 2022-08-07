drop sequence if exists api_menu_item_sequence;
drop index if exists idx_api_menu_item_datecreated;
drop index if exists idx_api_menu_item_name;
drop table if exists api_menu_item;

drop sequence if exists collection_sequence;
drop index if exists idx_collection_datecreated;
drop index if exists idx_collection_name;
drop table if exists api_collection;

drop sequence if exists api_http_sequence;
drop index if exists idx_api_http_datecreated;
drop table if exists api_http;



drop table if exists api_collection cascade;
create table api_collection
(
    id            int8                     not null,
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

comment on table api_collection is
    'api collection table. api集合表';

comment on column api_collection.created_by is
    'Record who created this data.  记录谁创建了数据';

comment on column api_collection.data_from is
    'Record the data source, and the value comes from the agreement of the business layer  记录数据来源,值来自业务层的约定';

comment on column api_collection.date_created is
    'the record created date-time,only set on date created.  数据的创建时间，只会在数据创建的时候被赋值';

comment on column api_collection.date_modified is
    'the record updated date-time,will be modified on data update.  数据的更新时间，会在数据更新时';

comment on column api_collection.modified_by is
    'Record who modified this data.  记录谁修改了数据';



comment on column api_collection.operation_url is
    'Record the URL to create or modify this data.  记录创建这条数据或者修改这条数据的url';
comment on column api_collection.tenant_id is
    'tenant id.ready for multi-tenancy.Probably not. 租户Id,为多租户做准备，有可能用不到';

comment on column api_collection.api_count is
    'api count belong this collection';

comment on column api_collection.name is
    'collection name';

comment on column api_collection.type is
    'collection type';

create index idx_collection_dateCreated on api_collection (date_created);

create index idx_collection_name on api_collection (name);
create sequence collection_sequence start 1 increment 1;


create table api_menu_item
(
    id            int8                     not null,
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

comment on table api_menu_item is
    'api menu in tree. api菜单表';

comment on column api_menu_item.created_by is
    'Record who created this data.  记录谁创建了数据';

comment on column api_menu_item.data_from is
    'Record the data source, and the value comes from the agreement of the business layer  记录数据来源,值来自业务层的约定';
comment on column api_menu_item.date_created is
    'the record created date-time,only set on date created.  数据的创建时间，只会在数据创建的时候被赋值';
comment on column api_menu_item.date_modified is
    'the record updated date-time,will be modified on data update.  数据的更新时间，会在数据更新时';
comment on column api_menu_item.modified_by is
    'Record who modified this data.  记录谁修改了数据';
comment on column api_menu_item.operation_url is
    'Record the URL to create or modify this data.  记录创建这条数据或者修改这条数据的url';

comment on column api_menu_item.tenant_id is
    'tenant id.ready for multi-tenancy.Probably not. 租户Id,为多租户做准备，有可能用不到';



comment on column api_menu_item.collection_id is
    'which collection belong to';



comment on column api_menu_item.define_id is
    'api define table id';
comment on column api_menu_item.name is
    'collection name';
comment on column api_menu_item.tag is
    'menu tag';

comment on column api_menu_item.type is
    'collection type';


comment on column api_menu_item.api_version is
    'api menu version.is also api define table version';
create index idx_api_menu_item_dateCreated on api_menu_item (date_created);
create index idx_api_menu_item_name on api_menu_item (name);
create sequence api_menu_item_sequence start 1 increment 1;

create table api_http
(
    id                  int8                     not null,
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
comment on table api_http is
    'api http detail. api http 信息表';
comment on column api_http.created_by is
    'Record who created this data.  记录谁创建了数据';
comment on column api_http.data_from is
    'Record the data source, and the value comes from the agreement of the business layer  记录数据来源,值来自业务层的约定';
comment on column api_http.date_created is
    'the record created date-time,only set on date created.  数据的创建时间，只会在数据创建的时候被赋值';
comment on column api_http.date_modified is
    'the record updated date-time,will be modified on data update.  数据的更新时间，会在数据更新时';
comment on column api_http.modified_by is
    'Record who modified this data.  记录谁修改了数据';
comment on column api_http.operation_url is
    'Record the URL to create or modify this data.  记录创建这条数据或者修改这条数据的url';
comment on column api_http.tenant_id is
    'tenant id.ready for multi-tenancy.Probably not. 租户Id,为多租户做准备，有可能用不到';
comment on column api_http.body_form is
    'http body form key-value json type';
comment on column api_http.body_graph_ql_query is
    'http body graphQl Query String part';
comment on column api_http.body_graph_ql_data is
    'http body graphQl data part';
comment on column api_http.body_text is
    'http body text json/xml/html/text...';
comment on column api_http.body_text_type is
    'http body none/url-encoded/form-data/raw/graphql';
comment on column api_http.body_type is
    'http body none/url-encoded/form-data/raw/graphql';
comment on column api_http.body_url_encoded is
    'http body url-encoded key-value json type';
comment on column api_http.header is
    'http header key-value json type';
comment on column api_http.host is
    'http host ip/domain name';
comment on column api_http.host_arr is
    'http host array type';
comment on column api_http.method is
    'http method get/post/custom';
comment on column api_http.path is
    'http path';
comment on column api_http.path_array is
    'http path array type';
comment on column api_http.port is
    'http port default 80';
comment on column api_http.protocol is
    'http protocol http/https';
comment on column api_http.query is
    'http query key-value  json type';
comment on column api_http.url is
    'http url';
comment on column api_http.version is
    'http define version.is also api define table version';
create index idx_api_http_dateCreated on api_http (date_created);
create sequence api_http_sequence start 1 increment 1;
